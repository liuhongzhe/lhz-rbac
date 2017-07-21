import { FormGroup } from '@angular/forms';
import { MdSnackBar, MdSnackBarConfig, MdDialogRef } from '@angular/material';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { environment } from '../../environments/environment';

import { Model } from '../../model/model';
import { ModelService } from '../../service/model-service';

export abstract class DetailDialogComponent<TModel extends Model, TModelService extends ModelService<TModel>, TDialog> {
    @BlockUI() protected blockUi: NgBlockUI;

    id?: string;
    data?: any;
    form: FormGroup;

    protected invokeFindById(id: string) {
        return new Promise<TModel>((resolve, reject) => {
            this.modelService.findById(id).then(r => {
                resolve(r);
            }).catch(e => {
                reject(e);
            });
        });
    }

    protected afterFindById(model: TModel) {
        return new Promise<TModel>((resolve) => {
            resolve(model);
        });
    }

    protected beforeSubmit(data: any) {
        return new Promise<any>((resolve) => {
            resolve(data);
        });
    }

    protected invokeCreateSubmit() {
        return new Promise<string>((resolve, reject) => {
            let data = this.form.value;
            this.beforeSubmit(data).then(r => {
                this.modelService.create(data).then(id => {
                    resolve(id);
                }).catch(e => {
                    reject(e);
                });
            }).catch(e => {
                reject(e);
            });
        });
    }

    protected invokeUpdateSubmit() {
        return new Promise<void>((resolve, reject) => {
            let data = this.form.getRawValue();
            this.beforeSubmit(data).then(r => {
                this.modelService.update(this.id, data).then(() => {
                    resolve();
                }).catch(e => {
                    reject(e);
                });
            }).catch(e => {
                reject(e);
            });
        });
    }

    protected abstract buildForm(): FormGroup;

    constructor(protected modelService: TModelService, protected snackBar: MdSnackBar, protected snackBarConfig: MdSnackBarConfig, protected dialogRef: MdDialogRef<TDialog>) { }

    showInfo(id?: string, data?: any) {
        this.id = id;
        this.data = data;
        this.form = this.buildForm();
        this.blockUi.start('加载中。。。');
        if (id) {
            let findByIdCallback = (isSuccessed: boolean, model?: TModel) => {
                if (isSuccessed === true) {
                    this.afterFindById(model).then(r => {
                        setTimeout(() => {
                            this.blockUi.stop();
                            this.form.patchValue(model);
                        }, environment.blockUiDelay);
                    }).catch(e => {
                        setTimeout(() => {
                            this.blockUi.stop();
                            this.dialogRef.close();
                        }, environment.blockUiDelay);
                    })
                }
                else {
                    setTimeout(() => {
                        this.blockUi.stop();
                        this.dialogRef.close();
                    }, environment.blockUiDelay);
                }
            };
            this.invokeFindById(id).then(r => {
                findByIdCallback(true, r);
            }).catch(e => {
                findByIdCallback(false);
            });
        }
        else {
            setTimeout(() => {
                this.blockUi.stop();
            }, environment.blockUiDelay);
        }
    }

    onSubmit() {
        let submitCallback = (isSuccessed: boolean) => {
            setTimeout(() => {
                if (isSuccessed === true) {
                    this.snackBar.open('提交成功。', null, this.snackBarConfig);
                    this.dialogRef.close(true);
                }
                else {
                    this.blockUi.stop();
                    this.snackBar.open('提交失败。', null, this.snackBarConfig);
                    this.dialogRef.close(false);
                }
            }, environment.blockUiDelay);
        };
        this.blockUi.start('提交中。。。');
        if (this.id) {
            this.invokeUpdateSubmit().then(() => {
                submitCallback(true);
            }).catch(e => {
                submitCallback(false);
            });
        }
        else {
            this.invokeCreateSubmit().then(r => {
                submitCallback(true);
            }).catch(e => {
                submitCallback(false);
            });
        }
    }
}