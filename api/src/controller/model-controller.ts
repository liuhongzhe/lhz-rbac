import * as restify from 'restify';
import { InternalError } from 'restify-errors';
import * as Sequelize from 'sequelize';
import * as uuid from 'uuid';
import * as fs from 'fs';
import * as nt from 'node-thumbnail';
import * as rimraf from 'rimraf';

import { config } from '../config';

import { Controller } from './controller';
import { Attribute } from '../storage/attribute/attribute';
import { Picture } from '../entity/picture';

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

    protected beforeCreate(data: any) {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }

    create(req: restify.Request, res: restify.Response) {
        if (!req.body.id) {
            req.body.id = uuid.v1();
        }
        this.beforeCreate(req.body).then(() => {
            this.model.create(req.body).then(r => {
                res.send(r.toJSON().id);
            }).catch(e => {
                res.send(new InternalError('Create failed.' + e));
            });
        }).catch(e => {
            res.send(new InternalError('Before create failed.' + e));
        });
    }

    protected beforeUpdate(id: string, data: any) {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }

    update(req: restify.Request, res: restify.Response) {
        let id = this.getRequestId(req);
        if (id) {
            this.model.findById(id).then(r => {
                this.beforeUpdate(id, req.body).then(() => {
                    r.update(req.body).then(r => {
                        res.end();
                    }).catch(e => {
                        res.send(new InternalError('Update(id:' + id + ') failed.' + e));
                    });
                }).catch(e => {
                    res.send(new InternalError('Before update failed.' + e));
                });
            }).catch(e => {
                res.send(new InternalError('FindById(id:' + id + ') failed.' + e));
            });
        }
        else {
            res.send(new InternalError('Id null.'));
        }
    }

    protected beforeDestroyById(id: string) {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }

    destroyById(req: restify.Request, res: restify.Response) {
        let id = this.getRequestId(req);
        if (id) {
            this.beforeDestroyById(id).then(() => {
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
            }).catch(e => {
                res.send(new InternalError('Delete model directory failed.'));
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

    findById(req: restify.Request, res: restify.Response) {
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

    find(req: restify.Request, res: restify.Response) {
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

    protected saveBase64(id: string, base64: string, category: string, pictureName: string) {
        return new Promise<Picture>((resolve, reject) => {
            if (base64) {
                let content = base64.replace(/^data:image\/\w+;base64,/, '');
                let buffer = new Buffer(content, 'base64');
                let pathDirectory = '';
                [config.assetsDirectoryName, this.modelName, id, category].forEach(item => {
                    pathDirectory += pathDirectory === '' ? item : ('/' + item);
                    if (!fs.existsSync(pathDirectory)) {
                        fs.mkdirSync(pathDirectory);
                    }
                });
                let pathPicture = [pathDirectory, pictureName].join('/');
                if (fs.existsSync(pathPicture) === true) {
                    fs.unlinkSync(pathPicture);
                }
                fs.writeFile(pathPicture, buffer, e => {
                    if (e) {
                        reject(e);
                    } else {
                        nt.thumb({
                            source: pathPicture,
                            destination: pathDirectory,
                            width: 120,
                            overwrite: true
                        }, (files, err, stdout, stderr) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve({
                                    picture: files[0].srcPath,
                                    thumbnail: files[0].dstPath
                                });
                            }
                        });
                    }
                });
            }
            else {
                resolve(null);
            }
        });
    }

    protected saveLogo(id: string, base64: string) {
        return new Promise<Picture>((resolve, reject) => {
            this.deleteLogo(id, false).then(() => {
                this.saveBase64(id, base64, config.logoDirectoryName, uuid.v1() + '.jpg').then(r => {
                    resolve(r);
                }).catch(e => {
                    reject(e);
                });
            }).catch(e => {
                reject(e);
            });
        });
    }

    protected checkAndClearModelDirectory(id: string) {
        let directory = [config.assetsDirectoryName, this.modelName, id].join('/');
        return new Promise<void>((resolve, reject) => {
            if (fs.existsSync(directory)) {
                fs.readdir(directory, (err, files) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        if (files.length === 0) {
                            fs.rmdir(directory, (err) => {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    resolve();
                                }
                            });
                        }
                    }
                });
            }
            else {
                resolve();
            }
        });
    }

    protected deleteLogo(id: string, isCheckAndClearModelDirectory: boolean = true) {
        return new Promise<void>((resolve, reject) => {
            let pathLogo = [config.assetsDirectoryName, this.modelName, id, config.logoDirectoryName].join('/');
            var deleteCallback = () => {
                if (isCheckAndClearModelDirectory === true) {
                    this.checkAndClearModelDirectory(id).then(() => {
                        resolve();
                    }).catch(e => {
                        reject(e);
                    });
                }
                else {
                    resolve();
                }
            };
            if (fs.existsSync(pathLogo) === true) {
                rimraf(pathLogo, e => {
                    if (e) {
                        reject(e);
                    }
                    else {
                        deleteCallback();
                    }
                });
            }
            else {
                deleteCallback();
            }
        });
    }

    protected deleteModelDirectory(id: string) {
        return new Promise<void>((resolve, reject) => {
            let pathModel = [config.assetsDirectoryName, this.modelName, id].join('/');
            if (fs.existsSync(pathModel) === true) {
                rimraf(pathModel, e => {
                    if (e) {
                        reject(e);
                    }
                    else {
                        resolve();
                    }
                });
            }
            else {
                resolve();
            }
        });
    }
}