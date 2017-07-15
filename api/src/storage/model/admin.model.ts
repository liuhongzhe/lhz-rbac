import * as Sequelize from 'sequelize';

import { AdminInstance } from '../instance/admin.instance';
import { AdminAttribute } from '../attribute/admin.attribute';

export interface AdminModel extends Sequelize.Model<AdminInstance, AdminAttribute> {

}