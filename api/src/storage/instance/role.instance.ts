import * as Sequelize from 'sequelize';

import { RoleAttribute } from '../attribute/role.attribute';

export interface RoleInstance extends Sequelize.Instance<RoleAttribute>, RoleAttribute {

}