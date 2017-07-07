import * as Sequelize from 'sequelize';

import { RegionInstance } from '../instance/region.instance';
import { RegionAttribute } from '../attribute/region.attribute';

export interface RegionModel extends Sequelize.Model<RegionInstance, RegionAttribute> {

}