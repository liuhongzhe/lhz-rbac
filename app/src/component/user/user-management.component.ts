import { Component } from '@angular/core';
import { ComponentType, MdSnackBar, MdSnackBarConfig, MdDialog } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';

import { environment } from '../../environments/environment';
import { Cache } from '../../cache';
import { CrudPageComponent } from '../common/crud-page.component';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { UserDetailDialogComponent } from './user-detail-dialog.component';

@Component({
    selector: 'user-management',
    templateUrl: '../../template/user/user-management.component.html'
})
export class UserManagementComponent extends CrudPageComponent<User, UserService, UserDetailDialogComponent> {
    constructor(protected cache: Cache, protected media: ObservableMedia, private userService: UserService, protected snackBar: MdSnackBar, protected snackBarConfig: MdSnackBarConfig, protected dialog: MdDialog) {
        super(cache, media, userService, snackBar, snackBarConfig, dialog);
        this.cache.title = '用户管理';
    }

    getName(user: User) {
        return user.lastName + ' ' + user.firstName;
    }

    getDialog() {
        return UserDetailDialogComponent;
    }
}