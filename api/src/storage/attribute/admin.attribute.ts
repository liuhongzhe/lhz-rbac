import { Attribute } from './attribute';

export interface AdminAttribute extends Attribute {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    photo?: string;
    phone?: string;
    email?: string;
}