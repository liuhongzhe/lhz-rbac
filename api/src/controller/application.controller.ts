import { InternalError } from 'restify-errors';

import { ModelController } from './model-controller';
import { ApplicationModel } from '../storage/model/application.model';
import { ApplicationInstance } from '../storage/instance/application.instance';
import { ApplicationAttribute } from '../storage/attribute/application.attribute';

export class ApplicationController extends ModelController<ApplicationModel, ApplicationInstance, ApplicationAttribute> {
    constructor(protected modelName) {
        super(modelName, ['name', 'description'], [['name', 'asc']]);
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
            debugger;
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
}