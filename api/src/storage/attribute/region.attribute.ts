import { Attribute } from './attribute';

export interface RegionAttribute extends Attribute {
    name: string;
    code: string;
    parent?: RegionAttribute;
    children?: RegionAttribute[];
}