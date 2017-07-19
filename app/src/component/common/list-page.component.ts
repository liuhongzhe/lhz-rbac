import { OnInit, OnDestroy } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig, MdDialog } from '@angular/material';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { environment } from '../../environments/environment';

import { Cache } from '../../cache';
import { Model } from '../../model/model';
import { ModelService } from '../../service/model-service';
import { Pagination } from '../../entity/pagination';
import { FindWithCount } from '../../entity/find-with-count';
import { ConfirmComponent } from './confirm.component';

export abstract class ListPageComponent<TModel extends Model, TModelService extends ModelService<TModel>> implements OnInit, OnDestroy {
    protected allowDelete: boolean = true;
    @BlockUI() private blockUi: NgBlockUI;

    serviceUrlRoot: string = environment.serviceUrlRoot;
    get urlTimestamp() {
        return '&timestamp=' + new Date().valueOf();
    }
    models: TModel[];
    text: string;
    columnCount: number = 1;
    rowCount: number = 5;
    pageIndex: number = 0;
    pageSize: number = 5;
    count: number;

    invokeFind(pagination?: Pagination, text?: string) {
        return new Promise<FindWithCount<TModel>>((resolve, reject) => {
            this.modelService.find(pagination, text).then(r => {
                resolve(r);
            }).catch(e => {
                reject(e);
            });
        });
    }

    abstract getName(model: TModel): string;

    invokeDestroy(model: TModel) {
        return new Promise<boolean>((resolve, reject) => {
            this.modelService.destroyById(model.id).then(() => {
                resolve();
            }).catch(e => {
                reject(e);
            });
        });
    }

    constructor(protected media: ObservableMedia, protected modelService: TModelService, protected snackBar: MdSnackBar, protected snackBarConfig: MdSnackBarConfig, protected dialog: MdDialog) {
        Cache.findFunction = this.search.bind(this);
        media.subscribe((change: MediaChange) => {
            this.mqChange();
        });
        this.mqChange();
    }

    private mqChange() {
        if (this.media.isActive('xs')) {
            this.columnCount = 1;
            this.rowCount = 5;
        }
        else if (this.media.isActive('sm')) {
            this.columnCount = 2;
            this.rowCount = 3;
        }
        else if (this.media.isActive('md')) {
            this.columnCount = 3;
            this.rowCount = 3;
        }
        else if (this.media.isActive('lg')) {
            this.columnCount = 4;
            this.rowCount = 3;
        }
        else if (this.media.isActive('xl')) {
            this.columnCount = 5;
            this.rowCount = 3;
        }
    }

    ngOnInit() {
        this.find();
    }

    ngOnDestroy() {
        Cache.findFunction = null;
    }

    find(pageIndex?: number) {
        this.models = null;
        let pagination: Pagination = {
            index: pageIndex || pageIndex === 0 ? pageIndex : this.pageIndex,
            size: this.columnCount * this.rowCount
        };
        this.blockUi.start('查询中。。。');
        let findCallback = (isSuccessed: boolean, r?: FindWithCount<TModel>) => {
            setTimeout(() => {
                this.blockUi.stop();
                if (isSuccessed === true) {
                    this.models = r.rows;
                    this.count = r.count;
                    this.pageIndex = pagination.index;
                    this.pageSize = pagination.size;
                }
            }, environment.blockUiDelay);
        };
        this.invokeFind(pagination, this.text).then(r => {
            findCallback(true, r);
        }).catch(e => {
            findCallback(false);
        });
    }

    search(text?: string) {
        this.text = text;
        this.find(0);
    }

    destroy(model: TModel) {
        if (this.allowDelete === true) {
            this.dialog.open(ConfirmComponent, {
                disableClose: true,
                data: {
                    title: '删除确认',
                    message: '确认删除【' + this.getName(model) + '】？'
                }
            }).afterClosed().subscribe(r => {
                if (r) {
                    let distroyCallback = (isSuccessed: boolean) => {
                        setTimeout(() => {
                            if (isSuccessed === true) {
                                this.snackBar.open('删除成功。', null, this.snackBarConfig);
                                this.find();
                            }
                            else {
                                this.blockUi.stop();
                            }
                        }, environment.blockUiDelay);
                    };
                    this.blockUi.start('删除中。。。');
                    this.invokeDestroy(model).then(r => {
                        distroyCallback(true);
                    }).catch(e => {
                        distroyCallback(false);
                    });
                }
            });
        }
        else {
            this.snackBar.open('不允许执行删除。', null, this.snackBarConfig);
        }
    }
}