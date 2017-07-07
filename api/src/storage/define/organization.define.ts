import * as Sequelize from 'sequelize';

import { Define } from '../define/define';
import { OrganizationModel } from '../model/organization.model';
import { OrganizationInstance } from '../instance/organization.instance';
import { OrganizationAttribute } from '../attribute/organization.attribute';

export class OrganizationDefine extends Define<OrganizationModel, OrganizationInstance, OrganizationAttribute> {
    define(sequelize: Sequelize.Sequelize) {
        return sequelize.define<OrganizationInstance, OrganizationAttribute>('organization', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            code: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            logo: {
                type: Sequelize.STRING(100)
            },
            phone: {
                type: Sequelize.STRING(20)
            },
            address: {
                type: Sequelize.STRING(100)
            }
        });
    }
}