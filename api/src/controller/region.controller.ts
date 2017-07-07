import { ModelController } from './model-controller';
import { RegionModel } from '../storage/model/region.model';
import { RegionInstance } from '../storage/instance/region.instance';
import { RegionAttribute } from '../storage/attribute/region.attribute';

export class RegionController extends ModelController<RegionModel, RegionInstance, RegionAttribute> { }