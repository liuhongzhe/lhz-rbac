import { Router } from './router';
import { UserController } from '../controller/user.controller';

export class UserRouter extends Router {
    config() {
        let controller = new UserController('user');
        this.api.get('/user/:id', controller.findById.bind(controller));
        this.api.post('/user', controller.create.bind(controller));
        this.api.put('/user/:id', controller.update.bind(controller));
        this.api.del('/user/:id', controller.destroyById.bind(controller));
    }
}