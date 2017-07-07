import * as Sequelize from 'sequelize';

import { UserAttribute } from '../attribute/user.attribute';

export interface UserInstance extends Sequelize.Instance<UserAttribute>, UserAttribute {

}