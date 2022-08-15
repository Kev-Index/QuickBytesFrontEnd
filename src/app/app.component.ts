import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { UserInfo, UserSecurityDto } from './auth/model/user.model';
import { AuthService } from './auth/service/auth.service';
import { Admin} from './model/admin.model'
import { Customer } from './model/customer.model';
import { Vendor } from './model/vendor.model';
import { AdminService } from './service/admin.service';
import { CustomerService } from './service/customer.service';
import { VendorService } from './service/vendor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  @ViewChild('sidenav') sidenav: MatSidenav;
  title = 'QuickBytes';
  user:UserSecurityDto;
  username:string;
  role:string;
  roleId:number;
  userId:number;
  
  constructor (private authService: AuthService, private vendorService: VendorService
    ,private customerService: CustomerService,private adminService: AdminService){
      this.username = localStorage.getItem("username");
      if(this.username != null){
        this.role = localStorage.getItem("role");
        this.authService.getUserSecurityDetailsByUsername(this.username).subscribe({
          next:(data)=>{
          this.userId = data.id;
          }
        })
        this.authService.userId$.subscribe({next: data=>{
          this.userId = data;
        }});
        this.authService.roleId$.subscribe({next: data=>{
          this.roleId = data;
        }});
      }
  }

 

  close(page:string) {
    this.title=page;
    this.sidenav.close();
  }
}
