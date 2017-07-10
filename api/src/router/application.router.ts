import { Router } from './router';
import { ApplicationController } from '../controller/application.controller';

export class ApplicationRouter extends Router {
    config() {
        let controller = new ApplicationController('application');
        this.api.get('/application', controller.find.bind(controller));
        this.api.get('/application/:id', controller.findById.bind(controller));
        this.api.post('/application', controller.create.bind(controller));
        this.api.put('/application/:id', controller.update.bind(controller));
        this.api.del('/application/:id', controller.destroyById.bind(controller));
    }
}