import * as Sequelize from 'sequelize';

import { MenuInstance } from '../instance/menu.instance';
import { MenuAttribute } from '../attribute/menu.attribute';

export interface MenuModel extends Sequelize.Model<MenuInstance, MenuAttribute> {

}