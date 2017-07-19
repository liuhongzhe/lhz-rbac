import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ModelService } from './model-service';
import { Menu } from '../model/menu';

@Injectable()
export class MenuService extends ModelService<Menu> {
    constructor(protected http: Http) {
        super(http, 'menu');
    }
}