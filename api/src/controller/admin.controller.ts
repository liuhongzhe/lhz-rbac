import * as restify from 'restify';
import { InternalError } from 'restify-errors';
import * as Sequelize from 'sequelize';

import { ModelController } from './model-controller';
import { AdminModel } from '../storage/model/admin.model';
import { AdminInstance } from '../storage/instance/admin.instance';
import { AdminAttribute } from '../storage/attribute/admin.attribute';

export class AdminController extends ModelController<AdminModel, AdminInstance, AdminAttribute> {
    constructor(protected modelName) {
        super(modelName, ['firstName', 'lastName', 'username', 'phone', 'email'], [['lastName', 'asc'], ['firstName', 'asc']]);
        let fo = {
            attributes: {
                exclude: ['password']
            }
        };
    }

    protected customFindByIdFo(req: restify.Request, fo: Sequelize.FindOptions<AdminAttribute>) {
        return new Promise<Sequelize.FindOptions<AdminAttribute>>(resolve => {
            fo.attributes = {
                exclude: ['password']
            };
            resolve(fo);
        });
    }

    protected customFindFo(req: restify.Request, fo: Sequelize.FindOptions<AdminAttribute>) {
        return new Promise<Sequelize.FindOptions<AdminAttribute>>(resolve => {
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

    protected beforeCreate(data: any) {
        return new Promise<any>((resolve, reject) => {
            if (data.logoBase64) {
                this.saveLogo(data.id, data.logoBase64).then(r => {
                    if (r) {
                        data.logo = r.picture;
                        data.logoThumbnail = r.thumbnail;
                        resolve();
                    }
                    else {
                        reject('logo处理结果为空。');
                    }
                }).catch(e => {
                    reject(e);
                });
            }
            else {
                resolve();
            }
        });
    }

    protected beforeUpdate(id: string, data: any) {
        return new Promise<void>((resolve, reject) => {
            if (data.logoBase64) {
                this.saveLogo(id, data.logoBase64).then(r => {
                    if (r) {
                        data.logo = r.picture;
                        data.logoThumbnail = r.thumbnail;
                    }
                    resolve();
                }).catch(e => {
                    reject(e);
                });
            }
            else {
                if (data.logo) {
                    resolve();
                }
                else {
                    this.deleteLogo(id).then(() => {
                        resolve();
                    }).catch(e => {
                        reject(e);
                    });
                }
            }
        });
    }

    protected beforeDestroyById(id: string) {
        return new Promise<void>((resolve, reject) => {
            this.deleteModelDirectory(id).then(() => {
                resolve();
            }).catch(e => {
                reject(e);
            });
        });
    }
}