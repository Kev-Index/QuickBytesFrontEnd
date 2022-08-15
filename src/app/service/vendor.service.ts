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
  user: UserInfo;
  getVendorApi: string;
  getUserApi: string;
  vendor: Vendor;
  
  constructor(private http:HttpClient) { 
    this.getVendorsApi = "http://localhost:8989/vendors";
    this.getVendorApi='http://localhost:8489/vendor/single/user/';
    this.getUserApi='http://localhost:8489/user/single/';
  }

  getVendors():Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.getVendorsApi);
  }

  getVendor() : Observable<Vendor>{
    this.http.get<UserInfo>(this.getUserApi+ localStorage.getItem('username')).subscribe({
      next : (data)=>{
          this.user = data;  
          console.log(localStorage.getItem('username'))
          console.log(this.user.id)}})
          return this.http.get<Vendor>(this.getVendorApi+ this.user.id);
  }
}

