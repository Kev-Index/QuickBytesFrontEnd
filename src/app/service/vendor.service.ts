import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendor } from '../model/vendor.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  getVendorsApi:string
  constructor(private http:HttpClient) { 
    this.getVendorsApi = "http://localhost:8989/vendors";
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
}
