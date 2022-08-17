import { Vendor } from "./vendor.model";

export class Combo {
    comboId: number;
    name: string;
    price: number;
    available?: number;
    vendor: Vendor;
}