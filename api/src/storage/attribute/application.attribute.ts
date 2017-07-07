import { Attribute } from './attribute';

export interface ApplicationAttribute extends Attribute {
    name: string;
    token: string;
}