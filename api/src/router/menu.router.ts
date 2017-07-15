import { Router } from './router';
import { MenuController } from '../controller/menu.controller';

export class MenuRouter extends Router {
    config() {
        let entityName = 'menu';
        let root = '/' + entityName;
        let controller = new MenuController(entityName);
        this.api.get(root, controller.find.bind(controller));
        this.api.get(root + '/:id', controller.findById.bind(controller));
        this.api.post(root, controller.create.bind(controller));
        this.api.put(root + '/:id', controller.update.bind(controller));
        this.api.del(root + '/:id', controller.destroyById.bind(controller));
    }
}