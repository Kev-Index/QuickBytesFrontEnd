import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/auth/model/user.model';
import { Admin } from 'src/app/model/admin.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-profile-edit',
  templateUrl: './admin-profile-edit.component.html',
  styleUrls: ['./admin-profile-edit.component.css']
})
export class AdminProfileEditComponent implements OnInit {
  user:UserInfo;
  admin:Admin;
  adminProfile:FormGroup;
  constructor(private adminService: AdminService, private router:Router) { }

  ngOnInit(): void {
    this.adminProfile = new FormGroup ({ 
      username: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    });

    this.adminService.getAdminByAdminId(localStorage.getItem('roleId')).subscribe({
      next:data=>{
        this.admin = data;
        this.adminProfile.controls['username'].setValue(this.admin.userId.username);
        this.adminProfile.controls['firstName'].setValue(this.admin.firstName);
        this.adminProfile.controls['lastName'].setValue(this.admin.lastName);
      }
    });
  }
  onFormSubmit(){
    this.admin.userId.username = this.adminProfile.value.username;
    this.admin.firstName = this.adminProfile.value.firstName;
    this.admin.lastName = this.adminProfile.value.lastName;
   
    this.adminService.putAdmin(this.admin).subscribe({
      next:(data)=>{
        this.router.navigateByUrl('/admin');
      }
    });

  }

}
