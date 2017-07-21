import * as restify from 'restify';
import { InternalError } from 'restify-errors';
import * as Sequelize from 'sequelize';

import { ModelController } from './model-controller';
import { OrganizationModel } from '../storage/model/organization.model';
import { OrganizationInstance } from '../storage/instance/organization.instance';
import { OrganizationAttribute } from '../storage/attribute/organization.attribute';

export class OrganizationController extends ModelController<OrganizationModel, OrganizationInstance, OrganizationAttribute> {
    constructor(protected modelName) {
        super(modelName, ['name', 'phone', 'address'], [['name', 'asc']]);
    }

    protected beforeCreate(data: any) {
        return new Promise<any>((resolve, reject) => {
            if (data.logoBase64) {
                this.saveLogo(data.id, data.logoBase64).then(r => {
                    if (r) {
                        data.logo = r.picture;
                        data.logoThumbnail = r.thumbnail;
                        resolve();
                    }
                    else {
                        reject('logo处理结果为空。');
                    }
                }).catch(e => {
                    reject(e);
                });
            }
            else {
                resolve();
            }
        });
    }

    protected beforeUpdate(id: string, data: any) {
        return new Promise<void>((resolve, reject) => {
            if (data.logoBase64) {
                this.saveLogo(id, data.logoBase64).then(r => {
                    if (r) {
                        data.logo = r.picture;
                        data.logoThumbnail = r.thumbnail;
                    }
                    resolve();
                }).catch(e => {
                    reject(e);
                });
            }
            else {
                if (data.logo) {
                    resolve();
                }
                else {
                    this.deleteLogo(id).then(() => {
                        resolve();
                    }).catch(e => {
                        reject(e);
                    });
                }
            }
        });
    }

    protected beforeDestroyById(id: string) {
        return new Promise<void>((resolve, reject) => {
            this.deleteModelDirectory(id).then(() => {
                resolve();
            }).catch(e => {
                reject(e);
            });
        });
    }

    findByParentId(req: restify.Request, res: restify.Response) {
        let parentId = req.params.parent_id;
        let searchText = this.getRequestSearchText(req);
        let fo: Sequelize.FindOptions<OrganizationAttribute> = {};
        fo = this.buildPaginationFindOptions(req, fo);
        fo.where = [];
        fo.where.push(Sequelize.and({
            parentId: parentId ? parentId : null
        }));
        if (searchText && this.likeColumns) {
            let whereItems = [];
            this.likeColumns.forEach(column => {
                let item = {};
                item[column] = { '$like': '%' + searchText + '%' }
                whereItems.push(item);
            });
            if (whereItems.length > 0) {
                fo.where.push(Sequelize.or(whereItems));
            }
        }
        fo.order = this.order;
        this.model.findAndCountAll(fo).then(ms => {
            res.send(ms);
        }).catch(e => {
            res.send(new InternalError('Find failed.' + e));
        });
    }
}