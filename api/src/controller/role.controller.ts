import { ModelController } from './model-controller';
import { RoleModel } from '../storage/model/role.model';
import { RoleInstance } from '../storage/instance/role.instance';
import { RoleAttribute } from '../storage/attribute/role.attribute';

export class RoleController extends ModelController<RoleModel, RoleInstance, RoleAttribute> {
    constructor(protected modelName) {
        super(modelName, ['name'], [['name', 'asc']]);
    }
}