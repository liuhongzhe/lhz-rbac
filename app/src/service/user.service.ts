import { Injectable } from '@angular/core';
import { Http, RequestMethod } from '@angular/http';

import { ModelService } from './model-service';
import { User } from '../model/user';

@Injectable()
export class UserService extends ModelService<User> {
    constructor(protected http: Http) {
        super(http, 'user');
    }

    queryByUsernameAndPassword(data: any): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            super.requestJson<User>(this.modelName + '/query-by-username-and-password', RequestMethod.Post, data).then(user => {
                resolve(user);
            }).catch(e => {
                reject(e);
            });
        });
    };
}