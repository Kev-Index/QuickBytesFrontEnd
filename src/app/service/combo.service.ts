import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDto, UserInfo } from '../auth/model/user.model';
import { Combo } from '../model/combo.model';
import { Item } from '../model/item.model';
import { Vendor } from '../model/vendor.model';

@Injectable({
  providedIn: 'root'
})
export class ComboService implements OnInit{

  getAllApi: string;
  user: UserInfo;
  getVendorApi: string;
  vendor: Vendor;
  item$ = new BehaviorSubject<Item[]>([]);
  combo$ = new BehaviorSubject<Combo[]>([]);
  getUserApi: string;
  page$ = new BehaviorSubject<number>(0);
  page: number;
  size: number;
  postComboApi: string;
  getComboIdApi: string;
  getCombosApi: string;

  constructor(private http: HttpClient) {
    this.getAllApi='http://localhost:8989/item/vendor/';
    this.getVendorApi='http://localhost:8989/vendor/single/user/';
    this.getUserApi='http://localhost:8989/user/single/';
    this.postComboApi='http://localhost:8989/combo/';
    this.getComboIdApi='http://localhost:8989/combo/';
    this.getCombosApi='http://localhost:8989/combos/vendorId/';
   }
  ngOnInit(): void {
  }

  

  getAllItems(page: number,size: number) : Observable<Item[]>{
    if(this.vendor != null) {
    return  this.http.get<Item[]>
    (this.getAllApi+this.vendor.vendorId);
  }
}

getCombos(page: number,size: number) : Observable<Combo[]>{
  if(this.vendor != null) {
  return  this.http.get<Combo[]>
  (this.getCombosApi+this.vendor.vendorId);
}
}


  getComboId(combo: Combo) : Observable<number>{
    return this.http.get<number>(this.getComboIdApi + combo.name);
  }

  postCombo(combo: Combo): Observable<Combo> {
    return this.http.post<Combo>(this.postComboApi+ this.vendor.vendorId, combo);
    console.log("hey");
  }

  getUser() : void{
    this.http.get<UserInfo>(this.getUserApi+ localStorage.getItem('username')).subscribe({
      next : (data)=>{
          this.user = data;  
          console.log(localStorage.getItem('username'))
          console.log(this.user.id)
          this.http.get<Vendor>(this.getVendorApi+ this.user.id).subscribe({
            next : (data)=>{
              this.vendor = data;  
              console.log(this.vendor.vendorId);
  }
})}
})}}