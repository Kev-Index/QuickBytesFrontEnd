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
  getCustomersApi:string;
  page$ = new BehaviorSubject<number>(0);
  message$ = new BehaviorSubject<string>('');
  customer$ = new ReplaySubject<Customer>(1);
  roleId:string;
  constructor(private http:HttpClient) {
    this.roleId = localStorage.getItem('roleId');
    console.log(this.roleId);
    this.getCustomerApi="http://localhost:8989/customer/" + this.roleId;
    this.putCustomerApi="http://localhost:8989/customer/" + this.roleId;
    this.getCustomersApi = "http://localhost:8989/customer";
   }
   getCustomers(page:number, size:number):Observable<Customer[]>{
    return this.http.get<Customer[]>(this.getCustomersApi +'?page='+page+'&size='+size);
  }
   getCustomerById():Observable<Customer>{
    return this.http.get<Customer>(this.getCustomerApi);
  }
  putCustomer(customer:Customer):Observable<Customer>{
    return this.http.put<Customer>(this.putCustomerApi,customer);
  }
}
