import * as Sequelize from 'sequelize';

import { MenuAttribute } from '../attribute/menu.attribute';

export interface MenuInstance extends Sequelize.Instance<MenuAttribute>, MenuAttribute {

}