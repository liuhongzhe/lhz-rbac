import { Model } from './model';

export interface Admin extends Model {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    photo?: string;
    phone?: string;
    email?: string;
}