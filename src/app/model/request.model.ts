import { Customer } from "./customer.model";
import { Vendor } from "./vendor.model";

export class Request {
    requestId?:number;
    totalPrice:number;
    status:string;
    orderTime:Date;
    endTime:Date;
    customer?:Customer;
    vendor?:Vendor;
}