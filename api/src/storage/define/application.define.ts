import * as Sequelize from 'sequelize';

import { Define } from '../define/define';
import { ApplicationModel } from '../model/application.model';
import { ApplicationInstance } from '../instance/application.instance';
import { ApplicationAttribute } from '../attribute/application.attribute';

export class ApplicationDefine extends Define<ApplicationModel, ApplicationInstance, ApplicationAttribute> {
    define(sequelize: Sequelize.Sequelize) {
        return sequelize.define<ApplicationInstance, ApplicationAttribute>('application', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            }
        });
    }
}