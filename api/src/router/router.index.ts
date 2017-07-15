import * as restify from 'restify';

import { AdminRouter } from './admin.router';
import { MenuRouter } from './menu.router';
import { RegionRouter } from './region.router';
import { ApplicationRouter } from './application.router';
import { OrganizationRouter } from './organization.router';
import { UserRouter } from './user.router';
import { RoleRouter } from './role.router';

export let init = function (api: restify.Server) {
    new AdminRouter(api).config();
    new MenuRouter(api).config();
    new RegionRouter(api).config();
    new ApplicationRouter(api).config();
    new OrganizationRouter(api).config();
    new UserRouter(api).config();
    new RoleRouter(api).config();
}