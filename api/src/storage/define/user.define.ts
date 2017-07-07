import * as Sequelize from 'sequelize';

import { Define } from '../define/define';
import { UserModel } from '../model/user.model';
import { UserInstance } from '../instance/user.instance';
import { UserAttribute } from '../attribute/user.attribute';

export class UserDefine extends Define<UserModel, UserInstance, UserAttribute> {
    define(sequelize: Sequelize.Sequelize) {
        return sequelize.define<UserInstance, UserAttribute>('user', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
                primaryKey: true
            },
            firstName: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            lastName: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            username: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            photo: {
                type: Sequelize.STRING(100)
            },
            phone: {
                type: Sequelize.STRING(20)
            },
            email: {
                type: Sequelize.STRING(50)
            }
        });
    }
}