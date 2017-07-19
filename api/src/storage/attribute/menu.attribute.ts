import { Attribute } from './attribute';

export interface MenuAttribute extends Attribute {
    icon?: string;
    name: string;
    path: string;
    rank?: number;
}