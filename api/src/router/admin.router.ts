import { Router } from './router';
import { AdminController } from '../controller/admin.controller';

export class AdminRouter extends Router {
    config() {
        let entityName = 'admin';
        let root = '/' + entityName;
        let controller = new AdminController(entityName);
        this.api.get(root, controller.find.bind(controller));
        this.api.get(root + '/:id', controller.findById.bind(controller));
        this.api.post(root, controller.create.bind(controller));
        this.api.put(root + '/:id', controller.update.bind(controller));
        this.api.del(root + '/:id', controller.destroyById.bind(controller));
    }
}