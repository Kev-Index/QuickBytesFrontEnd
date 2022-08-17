import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../model/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  getAdminByAdminIdApi: string;
  putAdminApi:string;

  constructor(private http: HttpClient) {
    this.getAdminByAdminIdApi = "http://localhost:8989/admin/";
    this.putAdminApi = "http://localhost:8989/admin/";
   }

  putAdmin(admin: Admin) {
    return this.http.put<Admin>(this.putAdminApi+admin.id,admin)
  }

  getAdminByAdminId(adminId:string):Observable<Admin>{
    return this.http.get<Admin>(this.getAdminByAdminIdApi+adminId)
  }

  
}
