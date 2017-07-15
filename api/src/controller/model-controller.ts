import * as restify from 'restify';
import { InternalError } from 'restify-errors';
import * as Sequelize from 'sequelize';

import { Controller } from './controller';
import { Attribute } from '../storage/attribute/attribute';

export abstract class ModelController<TModel extends Sequelize.Model<TInstance, TAttribute>, TInstance extends Sequelize.Instance<TAttribute>, TAttribute extends Attribute> extends Controller {
    protected model: TModel;

    constructor(protected modelName: string, protected likeColumns: string[] = null, protected order: string | string[][] = null) {
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
            res.send(new InternalError('Create failed.' + e));
        });
    }

    public update(req: restify.Request, res: restify.Response) {
        let id = this.getRequestId(req);
        if (id) {
            this.model.findById(id).then(r => {
                r.update(req.body).then(r => {
                    res.end();
                }).catch(e => {
                    res.send(new InternalError('Update(id:' + id + ') failed.' + e));
                });;
            }).catch(e => {
                res.send(new InternalError('FindById(id:' + id + ') failed.' + e));
            });
        }
        else {
            res.send(new InternalError('Id null.'));
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
                    res.send(new InternalError('Id(' + id + ') not found.'));
                }
                else if (r === 1) {
                    res.end();
                }
                else {
                    res.send(new InternalError('Id(' + id + ') found multi records.'));
                }
            });
        }
        else {
            res.send(new InternalError('Id null.'));
        }
    }

    protected customFindByIdFo(req: restify.Request, fo: Sequelize.FindOptions<TAttribute>) {
        return new Promise<Sequelize.FindOptions<TAttribute>>(resolve => {
            resolve(fo);
        });
    }

    public findById(req: restify.Request, res: restify.Response) {
        let id = this.getRequestId(req);
        if (id) {
            let fo: Sequelize.FindOptions<TAttribute> = {};
            let find = (fo: Sequelize.FindOptions<TAttribute>) => {
                this.model.findById(id, fo).then(r => {
                    if (r) {
                        res.send(r);
                    }
                    else {
                        res.end();
                    }
                }).catch(e => {
                    res.send(new InternalError('Id(' + id + ') find failed.' + e));
                });
            };
            if (this.customFindByIdFo) {
                this.customFindByIdFo(req, fo).then(fo => {
                    find(fo);
                }).catch(e => {
                    res.send(new InternalError('Custom find options failed.' + e));
                });
            }
            else {
                find(fo);
            }
        }
        else {
            res.send(new InternalError('Id null.'));
        }
    }

    protected customFindFo(req: restify.Request, fo: Sequelize.FindOptions<TAttribute>) {
        return new Promise<Sequelize.FindOptions<TAttribute>>(resolve => {
            resolve(fo);
        });
    }

    public find(req: restify.Request, res: restify.Response) {
        let searchText = this.getRequestSearchText(req);
        let fo: Sequelize.FindOptions<TAttribute> = {};
        let find = (fo: Sequelize.FindOptions<TAttribute>) => {
            if (searchText && this.likeColumns) {
                let whereItems = [];
                this.likeColumns.forEach(column => {
                    let item = {};
                    item[column] = { '$like': '%' + searchText + '%' }
                    whereItems.push(item);
                });
                if (whereItems.length > 0) {
                    fo.where = [Sequelize.or(whereItems)];
                }
            }
            let pagination = this.buildPaginationFindOptions(req, fo);
            fo.order = this.order;
            this.model.findAndCountAll(fo).then(ms => {
                res.send(ms);
            }).catch(e => {
                res.send(new InternalError('Find failed.' + e));
            });
        };
        if (this.customFindFo) {
            this.customFindFo(req, fo).then(fo => {
                find(fo);
            }).catch(e => {
                res.send(new InternalError('Find failed.' + e));
            });
        }
        else {
            find(fo);
        }
    }
}