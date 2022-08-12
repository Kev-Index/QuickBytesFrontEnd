import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  BehaviorSubject, Observable } from 'rxjs';
import { Item, ItemDto } from '../model/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  getVendorItemsApi: string;
  singleItemApi:string;
  page$ = new BehaviorSubject<number>(0);
  message$ = new BehaviorSubject<string>('');
  constructor(private http:HttpClient) { 
    this.getVendorItemsApi = "http://localhost:8989/item/vendor/";
    this.singleItemApi="http://localhost:8989/item/"
  }

  getItemsByVendor(vendorId:string, page:number, size:number):Observable<Item[]>{

    return this.http.get<Item[]>(this.getVendorItemsApi+vendorId +'?page='+page+'&size='+size);
  }

  getItem(itemId:string):Observable<ItemDto>{
    return this.http.get<ItemDto>(this.singleItemApi+itemId);
  }

  addItem(itemDto:ItemDto):Observable<any>{
    return this.http.post(this.singleItemApi+itemDto.vendorId,itemDto);
  }

  editItem(itemDto:ItemDto):Observable<any>{
    return this.http.put(this.singleItemApi+itemDto.itemId,itemDto);
  }
  testFunc(){
    console.log("test");
  }
}
