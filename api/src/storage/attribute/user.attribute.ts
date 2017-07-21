import { LogoAttribute } from './logo-attribute';
import { OrganizationAttribute } from './organization.attribute';

export interface UserAttribute extends LogoAttribute {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    phone?: string;
    email?: string;
    organization?: OrganizationAttribute;
}