import { Attribute } from './attribute';

export interface MenuAttribute extends Attribute {
    name: string;
    path: string;
    rank: number;
}