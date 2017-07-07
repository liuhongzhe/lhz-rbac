import * as Sequelize from 'sequelize';

import { Attribute } from '../attribute/attribute';

export abstract class Define<TModel extends Sequelize.Model<TInstance, TAttribute>, TInstance extends Sequelize.Instance<TAttribute>, TAttribute extends Attribute> {
    abstract define(sequelize: Sequelize.Sequelize): TModel;
}