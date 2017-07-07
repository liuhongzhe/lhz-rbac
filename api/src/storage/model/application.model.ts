import * as Sequelize from 'sequelize';

import { ApplicationInstance } from '../instance/application.instance';
import { ApplicationAttribute } from '../attribute/application.attribute';

export interface ApplicationModel extends Sequelize.Model<ApplicationInstance, ApplicationAttribute> {

}