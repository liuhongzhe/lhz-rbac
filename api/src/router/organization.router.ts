import { Router } from './router';
import { OrganizationController } from '../controller/organization.controller';

export class OrganizationRouter extends Router {
    config() {
        let entityName = 'organization';
        let root = '/' + entityName;
        let controller = new OrganizationController(entityName);
        this.api.get(root + '/find-by-parent-id', controller.findByParentId.bind(controller));
        this.api.get(root, controller.find.bind(controller));
        this.api.get(root + '/:id', controller.findById.bind(controller));
        this.api.post(root, controller.create.bind(controller));
        this.api.put(root + '/:id', controller.update.bind(controller));
        this.api.del(root + '/:id', controller.destroyById.bind(controller));
    }
}