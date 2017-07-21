import { Model } from './model';
import { Region } from './region';
import { User } from './user';

export interface Organization extends Model {
    name: string;
    code?: string;
    logo?: string;
    phone?: string;
    address?: string;
    parent: Organization;
    children: Organization[];
    region: Region;
    users: User[];
}