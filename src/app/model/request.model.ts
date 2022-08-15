import { Customer } from "./customer.model";
import { Vendor } from "./vendor.model";

export class Request {
    requestId?:number;
    totalPrice:number;
    status:string;
    orderTime:string;
    endTime:string;
    customer?:Customer;
    vendor?:Vendor;
}