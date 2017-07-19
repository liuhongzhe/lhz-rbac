import { Component } from '@angular/core';
import { ComponentType, MdSnackBar, MdSnackBarConfig, MdDialog } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';

import { environment } from '../../environments/environment';
import { Cache } from '../../cache';
import { CrudPageComponent } from '../common/crud-page.component';
import { Application } from '../../model/application';
import { ApplicationService } from '../../service/application.service';
import { ApplicationDetailDialogComponent } from './application-detail-dialog.component';

@Component({
    selector: 'application-management',
    templateUrl: '../../template/application/application-management.component.html'
})
export class ApplicationManagementComponent extends CrudPageComponent<Application, ApplicationService, ApplicationDetailDialogComponent> {
    constructor(protected media: ObservableMedia, private application: ApplicationService, protected snackBar: MdSnackBar, protected snackBarConfig: MdSnackBarConfig, protected dialog: MdDialog) {
        super(media, application, snackBar, snackBarConfig, dialog);
        Cache.title = '应用管理';
        // this.dialogConfig.width = '500px';
    }

    getName(application: Application) {
        return application.name;
    }

    getDialog() {
        return ApplicationDetailDialogComponent;
    }
}