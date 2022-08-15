import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ComboService } from 'src/app/service/combo.service';
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
  vendorService: any;

  constructor(private authService: AuthService, private router: Router, private comboService: ComboService) { }

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
            this.authService.username$.next(this.user.username);
            this.router.navigateByUrl("/"+ data.role);
            this.comboService.getUser();
            this.vendorService.setVendor();
        },
        error: (e)=> {
          this.authService.message$.next("Invalid Credentials");
        }
      });
  }

}

