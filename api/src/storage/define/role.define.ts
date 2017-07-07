import * as Sequelize from 'sequelize';

import { Define } from '../define/define';
import { RoleModel } from '../model/role.model';
import { RoleInstance } from '../instance/role.instance';
import { RoleAttribute } from '../attribute/role.attribute';

export class RoleDefine extends Define<RoleModel, RoleInstance, RoleAttribute> {
    define(sequelize: Sequelize.Sequelize) {
        return sequelize.define<RoleInstance, RoleAttribute>('role', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false
            }
        });
    }
}