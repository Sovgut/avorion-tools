import { Turret as TurretType } from '~data/turrets/enums';

export interface Turret {
    id: string;
    tab_id: string;
    type: TurretType;
    price: number;
    quantity: number;
    enabled: boolean;
    location: { x: number; y: number };
}