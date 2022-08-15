import { Request } from "./request.model";
import { Item } from "./item.model";

export class RequestItem {
    requestItemId:number;
    request:Request;
    item:Item;
}