import { ModelController } from './model-controller';
import { MenuModel } from '../storage/model/menu.model';
import { MenuInstance } from '../storage/instance/menu.instance';
import { MenuAttribute } from '../storage/attribute/menu.attribute';

export class MenuController extends ModelController<MenuModel, MenuInstance, MenuAttribute> {
    constructor(protected modelName) {
        super(modelName, ['name'], [['rank', 'asc']]);
    }
}