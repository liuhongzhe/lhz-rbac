import { LogoAttribute } from './logo-attribute';
import { RegionAttribute } from './region.attribute';
import { UserAttribute } from './user.attribute';

export interface OrganizationAttribute extends LogoAttribute {
    name: string;
    phone?: string;
    address?: string;
    parent: OrganizationAttribute;
    children: OrganizationAttribute[];
    region: RegionAttribute;
    users: UserAttribute[];
}