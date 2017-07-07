import * as Sequelize from 'sequelize';

import { RoleInstance } from '../instance/role.instance';
import { RoleAttribute } from '../attribute/role.attribute';

export interface RoleModel extends Sequelize.Model<RoleInstance, RoleAttribute> {

}