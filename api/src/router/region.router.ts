import { Router } from './router';
import { RegionController } from '../controller/region.controller';

export class RegionRouter extends Router {
    config() {
        let entityName = 'region';
        let root = '/' + entityName;
        let controller = new RegionController(entityName);
        this.api.get(root, controller.find.bind(controller));
        this.api.get(root + '/:id', controller.findById.bind(controller));
        this.api.post(root, controller.create.bind(controller));
        this.api.put(root + '/:id', controller.update.bind(controller));
        this.api.del(root + '/:id', controller.destroyById.bind(controller));
    }
}