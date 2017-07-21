import { LogoModel } from './logo-model';

export interface User extends LogoModel {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    phone?: string;
    email?: string;
}