import { LogoAttribute } from './logo-attribute';

export interface ApplicationAttribute extends LogoAttribute {
    name: string;
    description: string;
}