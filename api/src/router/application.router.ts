import { Router } from './router';
import { ApplicationController } from '../controller/application.controller';

export class ApplicationRouter extends Router {
    config() {
        let entityName = 'application';
        let root = '/' + entityName;
        let controller = new ApplicationController(entityName);
        this.api.get(root, controller.find.bind(controller));
        this.api.get(root + '/:id', controller.findById.bind(controller));
        this.api.post(root, controller.create.bind(controller));
        this.api.put(root + '/:id', controller.update.bind(controller));
        this.api.del(root + '/:id', controller.destroyById.bind(controller));
    }
}