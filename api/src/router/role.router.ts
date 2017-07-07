import { Router } from './router';
import { RoleController } from '../controller/role.controller';

export class RoleRouter extends Router {
    config() {
        let controller = new RoleController('role');
        this.api.get('/role/:id', controller.findById.bind(controller));
        this.api.post('/role', controller.create.bind(controller));
        this.api.put('/role/:id', controller.update.bind(controller));
        this.api.del('/role/:id', controller.destroyById.bind(controller));
    }
}