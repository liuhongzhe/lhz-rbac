import { LogoModel } from './logo-model';

export interface Application extends LogoModel {
    name: string;
    description?: string;
}