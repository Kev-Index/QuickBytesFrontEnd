import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Combo } from '../model/combo.model';

@Injectable({
  providedIn: 'root'
})
export class ComboService {
  getVendorItemsApi: string;
  singleItemApi:string;
  page$ = new BehaviorSubject<number>(0);
  message$ = new BehaviorSubject<string>('');


  constructor(private http:HttpClient) { 
    this.getVendorItemsApi = "http://localhost:8989/combos/vendorId/"
  }

  getCombosByVendor(vendorId:string):Observable<Combo[]>{
    return this.http.get<Combo[]>(this.getVendorItemsApi+vendorId);
  }

}
