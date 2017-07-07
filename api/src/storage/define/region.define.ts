import * as Sequelize from 'sequelize';

import { Define } from '../define/define';
import { RegionModel } from '../model/region.model';
import { RegionInstance } from '../instance/region.instance';
import { RegionAttribute } from '../attribute/region.attribute';

export class RegionDefine extends Define<RegionModel, RegionInstance, RegionAttribute> {
    define(sequelize: Sequelize.Sequelize) {
        return sequelize.define<RegionInstance, RegionAttribute>('region', {
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
                type: Sequelize.STRING(20),
                allowNull: false
            }
        });
    }
}