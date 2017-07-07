import { Router } from './router';
import { RegionController } from '../controller/region.controller';

export class RegionRouter extends Router {
    config() {
        let controller = new RegionController('region');
        this.api.get('/region/:id', controller.findById.bind(controller));
        this.api.post('/region', controller.create.bind(controller));
        this.api.put('/region/:id', controller.update.bind(controller));
        this.api.del('/region/:id', controller.destroyById.bind(controller));
    }
}