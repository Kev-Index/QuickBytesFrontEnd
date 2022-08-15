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
  myurl: string;
  
  constructor(private http:HttpClient) { 
    this.getVendorsApi = "http://localhost:8989/vendors";
    this.getVendorApi='http://localhost:8989/vendor/single/user/';
    this.getUserApi='http://localhost:8989/user/single/';
  }

  getVendors():Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.getVendorsApi);
  }

  setVendor() {
    this.http.get<UserInfo>(this.getUserApi+ localStorage.getItem('username')).subscribe({
      next : (data)=>{
          this.user = data;  
          console.log(localStorage.getItem('username'))
          console.log(this.user.id)
        this.myurl=this.getVendorApi+ this.user.id;
        this.http.get<Vendor>(this.myurl)
        .subscribe({
          next : (data)=>{
            this.vendor = data;  
            console.log(this.vendor.vendorId);
}
})
        }})
  }

  getVendor(): Vendor{
    return this.vendor;
  }

}

