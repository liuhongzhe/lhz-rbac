import { ModelController } from './model-controller';
import { OrganizationModel } from '../storage/model/organization.model';
import { OrganizationInstance } from '../storage/instance/organization.instance';
import { OrganizationAttribute } from '../storage/attribute/organization.attribute';

export class OrganizationController extends ModelController<OrganizationModel, OrganizationInstance, OrganizationAttribute> { }