import * as Sequelize from 'sequelize';

import { Define } from '../define/define';
import { AdminModel } from '../model/admin.model';
import { AdminInstance } from '../instance/admin.instance';
import { AdminAttribute } from '../attribute/admin.attribute';

export class AdminDefine extends Define<AdminModel, AdminInstance, AdminAttribute> {
    define(sequelize: Sequelize.Sequelize) {
        return sequelize.define<AdminInstance, AdminAttribute>('admin', {
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