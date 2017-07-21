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
            logo: {
                type: Sequelize.STRING(200)
            },
            logoThumbnail: {
                type: Sequelize.STRING(200)
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
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