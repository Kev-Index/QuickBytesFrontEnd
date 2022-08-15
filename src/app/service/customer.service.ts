import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  getCustomersApi:string;
  page$ = new BehaviorSubject<number>(0);
  message$ = new BehaviorSubject<string>('');
  constructor(private http: HttpClient) { 
    this.getCustomersApi = "http://localhost:8989/customer"
  }


  getCustomers(page:number, size:number):Observable<Customer[]>{

    return this.http.get<Customer[]>(this.getCustomersApi +'?page='+page+'&size='+size);
  }

}
