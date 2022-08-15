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

  constructor(private http:HttpClient) {
    this.getRequestItemsByRequestIdApi = environment.serverUrl + '/requestitem/rid';
    this.deleteRequestItemByIdApi = environment.serverUrl + '/requestitem';
  }

  fetchRequestItemsByRequestId(requestId: number):Observable<RequestItem[]> {
    return this.http.get<RequestItem[]>(this.getRequestItemsByRequestIdApi+"/"+requestId);
  }

  deleteRequestItemById(requestItemId: number):Observable<any> {
    return this.http.delete<any>(this.deleteRequestItemByIdApi+"/"+requestItemId);
  }

}
