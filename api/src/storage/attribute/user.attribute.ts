import { Attribute } from './attribute';
import { OrganizationAttribute } from './organization.attribute';

export interface UserAttribute extends Attribute {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    photo: string;
    phone: string;
    email: string;
    organization: OrganizationAttribute;
}