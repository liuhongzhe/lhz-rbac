import * as Sequelize from 'sequelize';

import { AdminAttribute } from '../attribute/admin.attribute';

export interface AdminInstance extends Sequelize.Instance<AdminAttribute>, AdminAttribute {

}