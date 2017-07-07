import { ModelController } from './model-controller';
import { ApplicationModel } from '../storage/model/application.model';
import { ApplicationInstance } from '../storage/instance/application.instance';
import { ApplicationAttribute } from '../storage/attribute/application.attribute';

export class ApplicationController extends ModelController<ApplicationModel, ApplicationInstance, ApplicationAttribute> { }