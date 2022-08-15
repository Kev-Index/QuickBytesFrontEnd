import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { CustomerService } from 'src/app/service/customer.service';
import { VendorService } from 'src/app/service/vendor.service';
import { UserInfo } from '../../model/user.model';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;
  loginForm: FormGroup;
  username: string;
  password: string;
  user: UserInfo;
  uid:number;

  constructor(private authService: AuthService,private vendorService: VendorService
    ,private customerService: CustomerService,private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });

    this.authService.message$.subscribe(data=>{
      this.message = data;
    })
  }

  onFormSubmit(){
      this.username = this.loginForm.value.username;
      this.password = this.loginForm.value.password;

      this.authService.login(this.username,this.password).subscribe({
        next : (data)=>{
            this.user = data;
            localStorage.setItem('username',this.user.username);
            localStorage.setItem('credentials', btoa(this.username + ':' + this.password));
            localStorage.setItem('role',this.user.role);
            this.authService.username$.next(data.username);
            this.authService.role$.next(data.role);
            this.authService.userId$.next(data.id);
            this.uid = data.id;
            console.log(this.uid);
            this.roleChoose(this.uid);
            this.router.navigateByUrl("/"+ data.role);
        },
        error: (e)=> {
          this.authService.message$.next("Invalid Credentials");
        }
      });
      
  }
  async roleChoose(uid:number){
    let r = localStorage.getItem("role");
    if (r == "vendor"){
      this.vendorService.getVendorByUserId(this.uid).subscribe({next:data=>{
        this.authService.roleId$.next(data.vendorId);
      }})
    }
    else if (r == "customer"){
      
    }
    else if (r == "admin"){
      
    }
    else{

    }
  }
}

