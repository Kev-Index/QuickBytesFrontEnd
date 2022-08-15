import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfo } from '../../model/user.model';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ROLES = ['customer', 'vendor', 'admin'];

  message: string;
  loginForm: FormGroup;
  username: string;
  password: string;
  user: UserInfo;

  constructor(private authService: AuthService, private router: Router) { }

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
            this.authService.username$.next(this.user.username);
            this.router.navigateByUrl("/"+ data.role);
            
            this.setRoleId();
            console.log(this.authService.roleId$);
        },
        error: (e)=> {
          this.authService.message$.next("Invalid Credentials");
        }
      });
  }

  setRoleId() {
    if (this.user.role == this.ROLES[0]) {
      this.authService.getCustomerByUserId(this.user.id).subscribe({
        next: (data) => {
          this.authService.roleId$.next(data.userId.id);
        },
        error: (e) => { }
      });
    } 
    if (this.user.role == this.ROLES[1]) {
      this.authService.getVendorByUserId(this.user.id).subscribe({
        next: (data) => {
          this.authService.roleId$.next(data.user.id);
        },
        error: (e) => { }
      });
    }
    if (this.user.role == this.ROLES[2]) {
      this.authService.getAdminByUserId(this.user.id).subscribe({
        next: (data) => {
          this.authService.roleId$.next(data.userId.id);
        },
        error: (e) => { }
      });
    }
  }
}

