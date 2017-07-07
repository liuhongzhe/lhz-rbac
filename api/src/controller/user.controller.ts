import { ModelController } from './model-controller';
import { UserModel } from '../storage/model/user.model';
import { UserInstance } from '../storage/instance/user.instance';
import { UserAttribute } from '../storage/attribute/user.attribute';

export class UserController extends ModelController<UserModel, UserInstance, UserAttribute> { }