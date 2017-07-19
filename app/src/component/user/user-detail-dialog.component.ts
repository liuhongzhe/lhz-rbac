import { Component } from '@angular/core';

import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { DetailDialogComponent } from '../common/detail-dialog.component';

@Component({
    selector: 'user-detail-dialog',
    templateUrl: '../../template/user/user-detail-dialog.component.html'
})
export class UserDetailDialogComponent extends DetailDialogComponent<User, UserService, UserDetailDialogComponent> {
    buildForm() {
        return null;
    }
}