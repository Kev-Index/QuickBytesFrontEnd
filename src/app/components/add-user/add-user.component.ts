import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from 'src/app/auth/model/user.model';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  newUserForm:FormGroup;
  user:UserInfo;
  
  roles: string[] = ['admin','vendor','customer'];
  constructor(private actRoute:ActivatedRoute, private router:Router,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.newUserForm = new FormGroup({
      username:new FormControl(''),
      password:new FormControl(''),
      role:new FormControl(''),
      securityQuestion:new FormControl(''),
      securityAnswer:new FormControl('')

    });
  }

  onFormSubmit(){
    this.user={
      username:this.newUserForm.value.username,
      password:this.newUserForm.value.password,
      role:this.newUserForm.value.role,
      securityQuestion:this.newUserForm.value.securityQuestion,
      securityAnswer:this.newUserForm.value.securityAnswer,
    };
  console.log(this.user);
  this.authService.addUser(this.user).subscribe({
    next:(d)=>{
      this.authService.message$.next('SignUp Success, Please Login')
      //the redirect is not made yet, make it James
      this.router.navigateByUrl('/admin');
    }
  })
}
}
