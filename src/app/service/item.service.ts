import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  BehaviorSubject, Observable } from 'rxjs';
import { Item, ItemDto } from '../model/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  getVendorItemsApi: string;
  addItemApi:string;
  message$ = new BehaviorSubject<string>('');
  constructor(private http:HttpClient) { 
    this.getVendorItemsApi = "http://localhost:8989/item/vendor/";
    this.addItemApi="http://localhost:8989/item/"
  }

  getItemsByVendor(vendorId:string):Observable<Item[]>{
    return this.http.get<Item[]>(this.getVendorItemsApi+vendorId);
  }

  addItem(itemDto:ItemDto):Observable<any>{
    return this.http.post(this.addItemApi+itemDto.vendorId,itemDto);
  }
  
}
