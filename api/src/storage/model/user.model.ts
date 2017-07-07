import * as Sequelize from 'sequelize';

import { UserInstance } from '../instance/user.instance';
import { UserAttribute } from '../attribute/user.attribute';

export interface UserModel extends Sequelize.Model<UserInstance, UserAttribute> {

}