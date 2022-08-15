import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer.model';
import { Vendor } from 'src/app/model/vendor.model';
import { Admin } from 'src/app/model/admin.model';
import { environment } from 'src/environments/environment';
import { UserInfo, UserSecurityDto } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username: string;
  username$ = new BehaviorSubject<string>('');
  user$ = new BehaviorSubject<string>('');
  roleId$ = new BehaviorSubject<number>(null);

  message$ = new BehaviorSubject<string>('');
  loginApi: string;
  signUpApi: string;
  userAPi: string;
  profileEditAPi: string;
  userSecurityInfoApi: string;
  securityAnswerValidationApi:string;
  passwordResetAPi: string;
  customerByUserIdApi: string;
  vendorByUserIdApi: string;
  adminByUserIdApi: string;

  constructor(private http: HttpClient) {
    this.username='';
    this.loginApi = environment.serverUrl + '/login';
    this.signUpApi=environment.serverUrl + '/user';
    this.userAPi = environment.serverUrl + '/user/username';
    this.profileEditAPi= environment.serverUrl + '/user/profile';
    this.userSecurityInfoApi= environment.serverUrl + '/user/security/info/';
    this.securityAnswerValidationApi= environment.serverUrl + '/validate-security-answer/';
    this.passwordResetAPi= environment.serverUrl +'/user/reset-password/';
    this.customerByUserIdApi= environment.serverUrl + '/customer/single/user/';
    this.vendorByUserIdApi= environment.serverUrl + '/vendor/single/user/';
    this.adminByUserIdApi= environment.serverUrl + '/admin/single/user/';
  }

  isLoggedIn(): boolean{
    //check if the user is logged in or not.
    this.username = localStorage.getItem('username');
    //console.log(this.username);
    if(this.username == null)
        return false;
    return true;
  }

  login(username: string, password: string): Observable<UserInfo> {
    let encodedCredentials = btoa(username + ':' + password); //aGFycnk6cG90dGVyMTIz
    let httpOptions={
      headers : new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization' : 'basic ' + encodedCredentials
      })
    };

     return this.http.get<UserInfo>(this.loginApi, httpOptions);
  }

  getUserSecurityDetailsByUsername(username: string) :Observable<UserSecurityDto>{
    return this.http.get<UserSecurityDto>(this.userSecurityInfoApi + username);
 }

 validateSecurityAnswer(username:string, answer: string): Observable<boolean> {
    let encodedText= btoa(username + '--'+answer);

    return this.http.get<boolean>(this.securityAnswerValidationApi + encodedText);
 }

 resetPassword(username: string, password: string):Observable<any> {
    let encodedText= btoa(username + '--'+password);
     return this.http.put(this.passwordResetAPi + encodedText,{});
 }

 getCustomerByUserId(userId:number):Observable<Customer> {
    return this.http.get<Customer>(this.customerByUserIdApi + userId);
 }

 getVendorByUserId(userId:number):Observable<Vendor> {
  return this.http.get<Vendor>(this.vendorByUserIdApi + userId);
}

getAdminByUserId(userId:number):Observable<Admin> {
  return this.http.get<Admin>(this.adminByUserIdApi + userId);
}

}