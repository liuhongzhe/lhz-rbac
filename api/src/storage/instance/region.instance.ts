import * as Sequelize from 'sequelize';

import { RegionAttribute } from '../attribute/region.attribute';

export interface RegionInstance extends Sequelize.Instance<RegionAttribute>, RegionAttribute {

}