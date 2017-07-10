import * as restify from 'restify';
import * as Sequelize from 'sequelize';

import { Controller } from './controller';
import { Attribute } from '../storage/attribute/attribute';

export abstract class ModelController<TModel extends Sequelize.Model<TInstance, TAttribute>, TInstance extends Sequelize.Instance<TAttribute>, TAttribute extends Attribute> extends Controller {
    protected model: TModel;

    constructor(protected modelName: string, protected likeColumns?: Array<string>, protected findOrder?: string | Array<Array<string>>) {
        super();
        if (this.rbacStorage.sequelize.isDefined(modelName)) {
            this.model = <TModel>this.rbacStorage.sequelize.model<TInstance, TAttribute>(modelName);
        }
        else {
            throw 'Model(' + modelName + ') undefined.';
        }
    }

    public create(req: restify.Request, res: restify.Response) {
        this.model.create(req.body).then(r => {
            res.send(r.toJSON().id);
        }).catch(e => {
            res.send(new restify.InternalError('Create error. Error:' + e));
        });
    }

    public update(req: restify.Request, res: restify.Response) {
        let id = this.getRequestId(req);
        if (id) {
            this.model.findById(id).then(r => {
                r.update(req.body).then(r => {
                    res.end();
                }).catch(e => {
                    res.send(new restify.InternalError('Update(id:' + id + ') error. Error:' + e));
                });;
            }).catch(e => {
                res.send(new restify.InternalError('FindById(id:' + id + ') error. Error:' + e));
            });
        }
        else {
            res.send(new restify.InternalError('Id null error.'));
        }
    }

    public destroyById(req: restify.Request, res: restify.Response) {
        let id = this.getRequestId(req);
        if (id) {
            this.model.destroy({
                where: {
                    id: id
                }
            }).then(r => {
                if (r === 0) {
                    res.send(new restify.InternalError('Id(' + id + ') not found.'));
                }
                else if (r === 1) {
                    res.end();
                }
                else {
                    res.send(new restify.InternalError('Id(' + id + ') found multi records.'));
                }
            });
        }
        else {
            res.send(new restify.InternalError('Id null error.'));
        }
    }

    public findById(req: restify.Request, res: restify.Response) {
        let id = this.getRequestId(req);
        if (id) {
            this.model.findById(id).then(r => {
                if (r) {
                    res.send(r);
                }
                else {
                    res.end();
                }
            }).catch(e => {
                res.send(new restify.InternalError('Id(' + id + ') find error.Error:' + e));
            });
        }
        else {
            res.send(new restify.InternalError('Id null error.'));
        }
    }

    public find(req: restify.Request, res: restify.Response) {
        let searchText = this.getRequestSearchText(req);
        let fo: Sequelize.FindOptions = {};
        if (searchText && this.likeColumns) {
            let whereItems = [];
            this.likeColumns.forEach(column => {
                let item = {};
                item[column] = { '$like': '%' + searchText + '%' }
                whereItems.push(item);
            });
            if (whereItems.length > 0) {
                fo.where = {
                    '$or': whereItems
                };
            }
        }
        let pagination = this.buildPaginationFindOptions(req, fo);
        if (this.findOrder) {
            fo.order = this.findOrder;
        }
        this.model.findAndCountAll(fo).then(ms => {
            res.send(ms);
        }).catch(e => {
            res.send(new restify.InternalError('Find error.Error:' + e));
        });
    }
}