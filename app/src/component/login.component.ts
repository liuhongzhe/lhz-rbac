import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { environment } from '../environments/environment';

import { AdminService } from '../service/admin.service';
import { Cache } from '../cache';

@Component({
    selector: 'login',
    templateUrl: '../template/login.component.html'
})
export class LoginComponent {
    @BlockUI() private blockUi: NgBlockUI;
    loginForm: FormGroup;
    showPassword: boolean = false;
    loginError: boolean = false;
    apiError: boolean = false;

    constructor(private cache: Cache, private router: Router, private fb: FormBuilder, private adminService: AdminService) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        this.loginError = false;
        this.apiError = false;
        let data = this.loginForm.getRawValue();
        this.blockUi.start('登录中。。。');
        this.adminService.queryByUsernameAndPassword(data.username, data.password).then(user => {
            setTimeout(() => {
                this.blockUi.stop();
                if (user) {
                    this.cache.loginUser = user;
                    this.router.navigate(['desktop']);
                }
                else {
                    this.loginError = true;
                }
            }, environment.blockUiDelay);
        }).catch(e => {
            setTimeout(() => {
                this.blockUi.stop();
                this.apiError = true;
            }, environment.blockUiDelay);
        });
    }
}