import { UserInfo } from "../auth/model/user.model";

export class Customer {
    customerId: number;
    employeeId: number;
    firstName: string;
    lastName: string;
    balance: number;
    userId: UserInfo;
}