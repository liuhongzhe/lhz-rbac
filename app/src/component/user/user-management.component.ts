import { Component } from '@angular/core';
import { MdSnackBar, MdDialog } from '@angular/material';

import { ListPageComponent } from '../common/list-page.component';
import { CrudPageComponent } from '../common/crud-page.component';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { UserDetailDialogComponent } from './user-detail-dialog.component';

@Component({
    selector: 'user-management',
    templateUrl: '../../template/user/user-management.component.html'
})
export class UserManagementComponent extends ListPageComponent<User, UserService> {
    getName(user: User) {
        return null;
    }

    getDialog() {
        return null;
    }
}