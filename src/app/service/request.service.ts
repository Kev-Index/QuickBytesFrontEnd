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
   getRequestsByCustomerIdApi:string;
   getRequestsByVendorIdApi:string;
   pendRequestApi:string;
   approveRequestApi:string;
   denyRequestApi:string;
   getPostApi:string;
   updateRequestPriceApi:string;
   deleteRequestApi:string;

   constructor(private http:HttpClient) {
      this.getRequestsApi = environment.serverUrl + '/requests';
      this.getRequestsByCustomerIdApi = environment.serverUrl + '/request/cid';
      this.getRequestsByVendorIdApi = environment.serverUrl + '/request/vid';
      this.pendRequestApi = environment.serverUrl + '/request/send';
      this.approveRequestApi = environment.serverUrl + '/request/approve';
      this.denyRequestApi = environment.serverUrl + '/request/deny';
      this.getPostApi = environment.serverUrl + '/request';
      this.updateRequestPriceApi = environment.serverUrl + '/request/price';
      this.deleteRequestApi = environment.serverUrl + '/request';
   }

   fetchRequests():Observable<Request[]> {
      return this.http.get<Request[]>(this.getRequestsApi);
   }

   fetchRequestByCustomerId(customerId:number):Observable<Request[]> {
      return this.http.get<Request[]>(this.getRequestsByCustomerIdApi+"/"+customerId);
   }

   fetchRequestsByVendorId(vendorId:number):Observable<Request[]> {
      return this.http.get<Request[]>(this.getRequestsByVendorIdApi+"/"+vendorId);
   }

   pendRequest(requestId:number):Observable<any> {
      return this.http.put<any>(this.pendRequestApi+"/"+requestId, { });
   }

   approveRequest(requestId:number):Observable<any> {
      return this.http.put<any>(this.approveRequestApi+"/"+requestId, { });
   }

   denyRequest(requestId:number):Observable<any> {
      return this.http.put<any>(this.denyRequestApi+"/"+requestId, { });
   }

   postRequest(request:Request,customerId:number,vendorId:number):Observable<any> {
      return this.http.post<any>(this.getPostApi+"/"+customerId+"/"+vendorId,request);
   }

   updateRequestPrice(requestId:number,price:number):Observable<any> {
      return this.http.put<any>(this.updateRequestPriceApi+"/"+requestId+"/"+price, { });
   }

   deleteRequest(requestId:number):Observable<any> {
      return this.http.delete<any>(this.getPostApi+"/"+requestId);
   }
}
