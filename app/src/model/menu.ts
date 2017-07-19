import { Model } from './model';

export interface Menu extends Model {
    name: string;
    path: string;
    rank?: number;
}