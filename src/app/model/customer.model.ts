import { UserInfo } from "../auth/model/user.model";

export class Customer {
    customerId?:number;
    employeeId?:number;
    firstName:string;
    lastName:string;
    balance:number;
    userId:UserInfo;

    middleName:string;
    email:string;
    phoneNumber:string;
    birthday:string;
    preferedName:string;
    addressLine1:string;
    addressLine2:string;
    suite:string;
    country:string;
    state:string;
    city:string;
    postalCode:string;

    termsAccepted:boolean;
    emailVerified:boolean;
    twoFactorAuth:boolean;
    phoneVerified:boolean;
}

