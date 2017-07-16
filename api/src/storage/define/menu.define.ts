import * as Sequelize from 'sequelize';

import { Define } from '../define/define';
import { MenuModel } from '../model/menu.model';
import { MenuInstance } from '../instance/menu.instance';
import { MenuAttribute } from '../attribute/menu.attribute';

export class MenuDefine extends Define<MenuModel, MenuInstance, MenuAttribute> {
    define(sequelize: Sequelize.Sequelize) {
        return sequelize.define<MenuInstance, MenuAttribute>('menu', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            path: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            rank: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        });
    }
}