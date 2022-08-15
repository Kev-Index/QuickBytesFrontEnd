import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  getCustomerApi:string;
  putCustomerApi:string;
  customer$ = new ReplaySubject<Customer>(1);
  constructor(private http:HttpClient) {
    this.getCustomerApi="http://localhost:8989/customer/10";
    this.putCustomerApi="http://localhost:8989/customer/10";
   }
   getCustomerById():Observable<Customer>{
    return this.http.get<Customer>(this.getCustomerApi);
  }
  putCustomer(customer:Customer):Observable<Customer>{
    return this.http.put<Customer>(this.putCustomerApi,customer);
  }
}
