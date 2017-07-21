import { Model } from './model';

export interface Region extends Model {
    name: string;
    code: string;
    parentId?: string;
    parent?: Region;
    children?: Region[];
}