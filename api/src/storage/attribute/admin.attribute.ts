import { LogoAttribute } from './logo-attribute';

export interface AdminAttribute extends LogoAttribute {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    phone?: string;
    email?: string;
}