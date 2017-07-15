import * as restify from 'restify';
import { InternalError } from 'restify-errors';
import * as Sequelize from 'sequelize';

import { ModelController } from './model-controller';
import { UserModel } from '../storage/model/user.model';
import { UserInstance } from '../storage/instance/user.instance';
import { UserAttribute } from '../storage/attribute/user.attribute';

export class UserController extends ModelController<UserModel, UserInstance, UserAttribute> {
    constructor(protected modelName) {
        super(modelName, ['firstName', 'lastName', 'username', 'photo', 'phone', 'email'], [['lastName', 'asc'], ['firstName', 'asc']]);
    }

    protected customFindByIdFo(req: restify.Request, fo: Sequelize.FindOptions<UserAttribute>) {
        return new Promise<Sequelize.FindOptions<UserAttribute>>(resolve => {
            fo.attributes = {
                exclude: ['password']
            };
            resolve(fo);
        });
    }

    protected customFindFo(req: restify.Request, fo: Sequelize.FindOptions<UserAttribute>) {
        return new Promise<Sequelize.FindOptions<UserAttribute>>(resolve => {
            fo.attributes = {
                exclude: ['password']
            };
            resolve(fo);
        });
    }

    public queryByUsernameAndPassword(req: restify.Request, res: restify.Response) {
        let username: string = req.body.username;
        let password: string = req.body.password;
        this.model.findAll({
            where: {
                username: username,
                password: password
            }
        }).then(users => {
            if (users.length === 0) {
                res.end();
            }
            else if (users.length === 1) {
                res.send(users[0]);
            }
            else {
                res.send(new InternalError('Find multi user.'));
            }
        }).catch(e => {
            res.send(new InternalError('Find failed.' + e));
        });
    }
}