import { Router } from './router';
import { OrganizationController } from '../controller/organization.controller';

export class OrganizationRouter extends Router {
    config() {
        let controller = new OrganizationController('organization');
        this.api.get('/organization/:id', controller.findById.bind(controller));
        this.api.post('/organization', controller.create.bind(controller));
        this.api.put('/organization/:id', controller.update.bind(controller));
        this.api.del('/organization/:id', controller.destroyById.bind(controller));
    }
}