import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item, ItemDto } from '../model/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  getVendorItemsApi: string;
  singleItemApi:string;
  putItemApi:string;
  page$ = new BehaviorSubject<number>(0);
  message$ = new BehaviorSubject<string>('');
  vendorId:string;


  constructor(private http:HttpClient) { 
    this.vendorId = localStorage.getItem('vendorId');
    this.getVendorItemsApi = "http://localhost:8989/item/vendor/";
    this.singleItemApi="http://localhost:8989/item/"
    this.putItemApi=environment.serverUrl + "/item/";
  }

  getItemsByVendorId(vendorId:string):Observable<Item[]>{
    return this.http.get<Item[]>(this.getVendorItemsApi+vendorId);
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

  putItem(item:Item):Observable<any>{
    return this.http.put(this.singleItemApi+item.itemId,item);
  }
}
