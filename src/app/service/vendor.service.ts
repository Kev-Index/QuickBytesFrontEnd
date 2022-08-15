import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../auth/model/user.model';
import { Vendor } from '../model/vendor.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  getVendorsApi:string
  getSingleVendorApi: string;
  constructor(private http:HttpClient) { 
    this.getVendorsApi = "http://localhost:8989/vendors";
    this.getSingleVendorApi = "http://localhost:8989/vendor/single/user/";
  }

  getVendors():Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.getVendorsApi);
  }

  getVendorByUserId(userId: number):Observable<Vendor>{
    return this.http.get<Vendor>(this.getSingleVendorApi+userId)
  }
}
