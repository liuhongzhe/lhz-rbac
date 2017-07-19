import { Injectable } from '@angular/core';
import { Http, RequestMethod } from '@angular/http';

import { ModelService } from './model-service';
import { Admin } from '../model/admin';

@Injectable()
export class AdminService extends ModelService<Admin> {
    constructor(protected http: Http) {
        super(http, 'admin');
    }

    queryByUsernameAndPassword(username: string, password: string) {
        return new Promise<Admin>((resolve, reject) => {
            super.requestJson<Admin>('admin/query-by-username-and-password', RequestMethod.Post, {
                username: username,
                password: password
            }).then(user => {
                resolve(user);
            }).catch(e => {
                reject(e);
            });
        });
    };
}