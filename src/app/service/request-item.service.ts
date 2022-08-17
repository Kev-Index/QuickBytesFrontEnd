import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestItem } from '../model/requestItem.model';

@Injectable({
  providedIn: 'root'
})
export class RequestItemService {

  getRequestItemsByRequestIdApi:string;
  deleteRequestItemByIdApi:string;
  postRequestItemApi:string;

  constructor(private http:HttpClient) {
    this.getRequestItemsByRequestIdApi = environment.serverUrl + '/requestitem/rid';
    this.deleteRequestItemByIdApi = environment.serverUrl + '/requestitem';
    this.postRequestItemApi = environment.serverUrl + '/requestitem';
  }
  
  postRequestItem(requestId:number,itemId:number):Observable<any> {
    return this.http.post<any>(this.postRequestItemApi+"/"+requestId+"/"+itemId,{});
  }

  fetchRequestItemsByRequestId(requestId: number):Observable<RequestItem[]> {
    return this.http.get<RequestItem[]>(this.getRequestItemsByRequestIdApi+"/"+requestId);
  }

  deleteRequestItemById(requestItemId: number):Observable<any> {
    return this.http.delete<any>(this.deleteRequestItemByIdApi+"/"+requestItemId);
  }
}
