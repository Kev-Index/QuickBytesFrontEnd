import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../auth/model/user.model';
import { Vendor, VendorEditDto } from '../model/vendor.model';

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
  getSingleVendorApi: string;
  getVendorByIdApi: string;
  getUpdateVendorApi: string;
  
  constructor(private http:HttpClient) { 
    this.getVendorsApi = "http://localhost:8989/vendors";
    this.getVendorApi='http://localhost:8989/vendor/single/user/';
    this.getUserApi='http://localhost:8989/user/single/';
    this.getVendorsApi = "http://localhost:8989/vendors";
    this.getUpdateVendorApi = "http://localhost:8989/vendor/";
    this.getSingleVendorApi = "http://localhost:8989/vendor/single/user/";
    this.getVendorByIdApi = "http://localhost:8989/vendor/single/";
  }

  getVendors():Observable<Vendor[]> {
    let httpOptions={
      headers : new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization' : 'basic ' + localStorage.getItem('credentials')
      })
    };

    return this.http.get<Vendor[]>(this.getVendorsApi,httpOptions);
  }

  getVendorByUserId(userId: number):Observable<Vendor>{
    return this.http.get<Vendor>(this.getSingleVendorApi+userId)
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
            console.log(this.vendor.vendorId+ "hey");
            localStorage.setItem('vendorId', this.vendor.vendorId.toString());
}
})
        }})
  }

  getVendor(): Observable<Vendor>{
    return this.http.get<Vendor>(this.getVendorByIdApi+ localStorage.getItem('vendorId'))
  }

  updateVendor(vendor: VendorEditDto): Observable<Vendor>{
    return this.http.put<Vendor>(this.getUpdateVendorApi+localStorage.getItem('vendorId'), vendor);

  }

}

