import * as Sequelize from 'sequelize';

import { config } from '../config';
import { AdminDefine } from './define/admin.define';
import { AdminModel } from './model/admin.model';
import { MenuDefine } from './define/menu.define';
import { MenuModel } from './model/menu.model';
import { RegionDefine } from './define/region.define';
import { RegionModel } from './model/region.model';
import { ApplicationDefine } from './define/application.define';
import { ApplicationModel } from './model/application.model';
import { OrganizationDefine } from './define/organization.define';
import { OrganizationModel } from './model/organization.model';
import { UserDefine } from './define/user.define';
import { UserModel } from './model/user.model';
import { RoleDefine } from './define/role.define';
import { RoleModel } from './model/role.model';

export class RbacStorage {
    sequelize: Sequelize.Sequelize;
    adminModel: AdminModel;
    menuModel: MenuModel;
    regionModel: RegionModel;
    applicationModel: ApplicationModel;
    organizationModel: OrganizationModel;
    userModel: UserModel;
    roleModel: RoleModel;

    init(force?: boolean): Promise<any> {
        force = force || false;
        return new Promise<any>((resolve, reject) => {
            this.sequelize.sync({ force: force, logging: config.isShowRdacInitLog }).then(r => {
                resolve(r);
            }).catch(e => {
                reject(e);
            });
        });
    }

    constructor() {
        this.sequelize = new Sequelize(config.rbacDatabase, config.rbacUsername, config.rbasPassword, config.rbacOptions);
        this.adminModel = new AdminDefine().define(this.sequelize);
        this.menuModel = new MenuDefine().define(this.sequelize);
        this.regionModel = new RegionDefine().define(this.sequelize);
        this.regionModel.hasMany(this.regionModel, {
            as: 'children',
            foreignKey: 'parentId'
        });
        this.regionModel.belongsTo(this.regionModel, {
            as: 'parent'
        });
        this.applicationModel = new ApplicationDefine().define(this.sequelize);
        this.organizationModel = new OrganizationDefine().define(this.sequelize);
        this.organizationModel.hasMany(this.organizationModel, {
            as: 'children',
            foreignKey: 'parentId'
        });
        this.organizationModel.belongsTo(this.organizationModel, {
            as: 'parent'
        });
        this.organizationModel.belongsTo(this.regionModel);
        this.userModel = new UserDefine().define(this.sequelize);
        this.organizationModel.hasMany(this.userModel);
        this.userModel.belongsTo(this.organizationModel);
        this.roleModel = new RoleDefine().define(this.sequelize);
        let userRoleModel = this.sequelize.define('userRole', {
            userId: {
                type: Sequelize.UUID,
                primaryKey: true
            },
            roleId: {
                type: Sequelize.UUID,
                primaryKey: true
            },
            applicationId: {
                type: Sequelize.UUID,
                primaryKey: true,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                references: {
                    model: this.applicationModel
                }
            }
        });
        this.userModel.belongsToMany(this.roleModel, {
            through: {
                model: userRoleModel,
                unique: false
            }
        });
        this.roleModel.belongsToMany(this.userModel, {
            through: {
                model: userRoleModel,
                unique: false
            }
        });
    }
}