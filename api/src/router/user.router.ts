import { Router } from './router';
import { UserController } from '../controller/user.controller';

export class UserRouter extends Router {
    config() {
        let entityName = 'user';
        let root = '/' + entityName;
        let controller = new UserController(entityName);
        this.api.post(root + '/query-by-username-and-password', controller.queryByUsernameAndPassword.bind(controller));
        this.api.get(root, controller.find.bind(controller));
        this.api.get(root + '/:id', controller.findById.bind(controller));
        this.api.post(root, controller.create.bind(controller));
        this.api.put(root + '/:id', controller.update.bind(controller));
        this.api.del(root + '/:id', controller.destroyById.bind(controller));
    }
}