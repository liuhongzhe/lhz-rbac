import * as Sequelize from 'sequelize';

import { OrganizationAttribute } from '../attribute/organization.attribute';

export interface OrganizationInstance extends Sequelize.Instance<OrganizationAttribute>, OrganizationAttribute {

}