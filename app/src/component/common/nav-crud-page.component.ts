import { OnInit, OnDestroy } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig, MdDialog, MdDialogConfig, ComponentType } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';

import { environment } from '../../environments/environment';

import { Cache } from '../../cache';
import { Model } from '../../model/model';
import { ModelService } from '../../service/model-service';
import { DetailDialogComponent } from './detail-dialog.component';
import { CrudPageComponent } from './crud-page.component';

export abstract class NavCrudPageComponent<TModel extends Model, TModelService extends ModelService<TModel>, TDialog extends DetailDialogComponent<TModel, TModelService, TDialog>> extends CrudPageComponent<TModel, TModelService, TDialog> implements OnInit, OnDestroy {
    parentId: string;
    parents: TModel[] = [];
    rootTitle: string;

    constructor(protected cache: Cache, protected media: ObservableMedia, protected modelService: TModelService, protected snackBar: MdSnackBar, protected snackBarConfig: MdSnackBarConfig, protected dialog: MdDialog) {
        super(cache, media, modelService, snackBar, snackBarConfig, dialog);
    }

    ngOnInit() {
        super.ngOnInit();
        this.rootTitle = this.cache.title;
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.cache.backFunction = null;
    }

    enter(model: TModel, push: boolean = true) {
        if (model) {
            if (push === true) {
                this.parents.push(model);
            }
            this.parentId = model.id;
            this.cache.title = this.getName(model);
            this.cache.backFunction = this.back.bind(this);
        }
        else {
            this.parents = [];
            this.parentId = null;
            this.cache.title = this.rootTitle;
            this.cache.backFunction = null;
        }
        this.cache.createFunctionData = this.parentId;
        this.find();
    }

    back() {
        let parent = this.parents.splice(this.parents.length - 1, 1);
        if (this.parents.length === 0) {
            this.enter(null);
        }
        else {
            this.enter(this.parents[this.parents.length - 1], false);
        }
    }
}