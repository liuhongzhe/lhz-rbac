import { Router } from './router';
import { RoleController } from '../controller/role.controller';

export class RoleRouter extends Router {
    config() {
        let entityName = 'role';
        let root = '/' + entityName;
        let controller = new RoleController(entityName);
        this.api.get(root, controller.find.bind(controller));
        this.api.get(root + '/:id', controller.findById.bind(controller));
        this.api.post(root, controller.create.bind(controller));
        this.api.put(root + '/:id', controller.update.bind(controller));
        this.api.del(root + '/:id', controller.destroyById.bind(controller));
    }
}