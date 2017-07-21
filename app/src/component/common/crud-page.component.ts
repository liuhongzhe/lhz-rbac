import { MdSnackBar, MdSnackBarConfig, MdDialog, MdDialogConfig, ComponentType } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';

import { environment } from '../../environments/environment';

import { Cache } from '../../cache';
import { Model } from '../../model/model';
import { ModelService } from '../../service/model-service';
import { DetailDialogComponent } from './detail-dialog.component';
import { ListPageComponent } from './list-page.component';

export abstract class CrudPageComponent<TModel extends Model, TModelService extends ModelService<TModel>, TDialog extends DetailDialogComponent<TModel, TModelService, TDialog>> extends ListPageComponent<TModel, TModelService> {
    protected dialogConfig: MdDialogConfig = {
        disableClose: true
    };
    protected abstract getDialog(): ComponentType<TDialog>;

    constructor(protected cache: Cache, protected media: ObservableMedia, protected modelService: TModelService, protected snackBar: MdSnackBar, protected snackBarConfig: MdSnackBarConfig, protected dialog: MdDialog) {
        super(cache, media, modelService, snackBar, snackBarConfig, dialog);
        this.cache.createFunction = this.create.bind(this);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.cache.createFunction = null;
    }

    create(data: any) {
        let dialog = this.dialog.open(this.getDialog(), this.dialogConfig);
        dialog.componentInstance.showInfo(null, data);
        dialog.afterClosed().subscribe(r => {
            if (r) {
                this.find();
            }
        });
    }

    update(id: string) {
        let dialog = this.dialog.open(this.getDialog(), this.dialogConfig);
        dialog.componentInstance.showInfo(id);
        dialog.afterClosed().subscribe(r => {
            if (r) {
                this.find();
            }
        });
    }
}