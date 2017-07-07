import * as Sequelize from 'sequelize';

import { OrganizationInstance } from '../instance/organization.instance';
import { OrganizationAttribute } from '../attribute/organization.attribute';

export interface OrganizationModel extends Sequelize.Model<OrganizationInstance, OrganizationAttribute> {

}