import { Vendor } from "./vendor.model";

export class Item {
    itemId: number;
    vendor: Vendor;
    name:string;
    price:number;
    quantity:number;
}

export class ItemDto{
    itemId: number;
    name:string;
    price:number;
    quantity:number;
}