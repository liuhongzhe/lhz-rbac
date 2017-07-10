import { Attribute } from './attribute';

export interface ApplicationAttribute extends Attribute {
    name: string;
    key: string;
    secret: string;
}