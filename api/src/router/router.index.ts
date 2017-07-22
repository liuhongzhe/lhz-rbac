import * as restify from 'restify';
import * as path from 'path';

import { AdminRouter } from './admin.router';
import { MenuRouter } from './menu.router';
import { RegionRouter } from './region.router';
import { ApplicationRouter } from './application.router';
import { OrganizationRouter } from './organization.router';
import { UserRouter } from './user.router';
import { RoleRouter } from './role.router';

export let init = function (api: restify.Server) {
    api.get(/\/assets\/?.*/, restify.plugins.serveStatic({
        directory: path.join(__dirname, '../', '../')
    }));
    new AdminRouter(api).config();
    new MenuRouter(api).config();
    new RegionRouter(api).config();
    new ApplicationRouter(api).config();
    new OrganizationRouter(api).config();
    new UserRouter(api).config();
    new RoleRouter(api).config();
}