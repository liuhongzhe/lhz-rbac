import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ModelService } from './model-service';
import { Application } from '../model/application';

@Injectable()
export class ApplicationService extends ModelService<Application> {
    constructor(protected http: Http) {
        super(http, 'application');
    }
}