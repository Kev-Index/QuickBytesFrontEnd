import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item, ItemDto } from '../model/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  getVendorItemsApi: string;
  constructor(private http:HttpClient) { 
    this.getVendorItemsApi = "http://localhost:8989/item/vendor/";
  }

  getItemsByVendor(vendorId:string):Observable<Item[]>{
    return this.http.get<Item[]>(this.getVendorItemsApi+vendorId);
    
  }
}
