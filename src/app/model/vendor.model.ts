import { UserInfo } from "../auth/model/user.model";

export class Vendor {
    vendorId: number;
    businessId: number;
    name: string;
    user: UserInfo;
}

export class VendorEditDto{
    name: string;
    businessId: number;

}