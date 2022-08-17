import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../auth/model/user.model';
import { Vendor } from '../model/vendor.model';

@Injectable({
  providedIn: 'root'
})
export class EditInfoService {
  getUserApi:string
  User: UserInfo
  
  constructor(private http:HttpClient) {
    this.getUserApi='http://localhost:8989/user/single/';
  }

getUser(): Observable<UserInfo>{
    return this.http.get<UserInfo>(this.getUserApi+ localStorage.getItem('username'))

}
}