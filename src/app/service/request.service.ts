import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Request } from "../model/request.model";

@Injectable({
    providedIn: "root"
})
export class RequestService {
 getRequestsApi:string;
 getRequestsByVendorIdApi:string;
 getPostApi:string;

 constructor(private http:HttpClient) {
    this.getRequestsApi = environment.serverUrl + '/requests';
    this.getRequestsApi = environment.serverUrl + '/request/vid';
    this.getPostApi = environment.serverUrl + '/request';
 }

 fetchRequests():Observable<Request[]> {
    return this.http.get<Request[]>(this.getRequestsApi);
 }

 fetchRequestsByVendorId(vendorId:number):Observable<Request[]> {
   return this.http.get<Request[]>(this.getRequestsApi+"/"+vendorId);
}

 postRequest(request:Request,vendorId:number,customerId:number):Observable<any> {
    return this.http.post<any>(this.getPostApi+"/"+vendorId+"/"+customerId,request);
 }
}
