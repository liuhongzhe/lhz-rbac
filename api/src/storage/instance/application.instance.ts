import * as Sequelize from 'sequelize';

import { ApplicationAttribute } from '../attribute/application.attribute';

export interface ApplicationInstance extends Sequelize.Instance<ApplicationAttribute>, ApplicationAttribute {

}