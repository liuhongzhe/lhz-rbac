import { Attribute } from './attribute';
import { RegionAttribute } from './region.attribute';
import { UserAttribute } from './user.attribute';

export interface OrganizationAttribute extends Attribute {
    name: string;
    code?: string;
    logo?: string;
    phone?: string;
    address?: string;
    parent: OrganizationAttribute;
    children: OrganizationAttribute[];
    region: RegionAttribute;
    users: UserAttribute[];
}