import { Injectable } from '@angular/core';

import { User } from '../model/user';

@Injectable()
export class CacheService {
    loginUser: User;
    moduleTitle: string;
    moduleHasCreate: boolean = false;
    moduleHasFind: boolean = false;
    // get loginUser(): User {
    //     return <User>JSON.parse(sessionStorage.getItem('login-user'));
    // }
    // set loginUser(user: User) {
    //     sessionStorage.setItem('login-user', JSON.stringify(user));
    // }
}