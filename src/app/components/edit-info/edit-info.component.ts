import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { UserEditDto, UserInfo } from 'src/app/auth/model/user.model';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Vendor, VendorEditDto } from 'src/app/model/vendor.model';
import { EditInfoService } from 'src/app/service/edit-info.service';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent implements OnInit {
  useredit: UserInfo;
  user: UserInfo;
  profileForm: FormGroup;
  username: string;
  vendor: Vendor;
  name: string;
  businessId: number;

 
  constructor(private authService: AuthService, private editInfoService: EditInfoService, private vendorService: VendorService, private router: Router) { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      username: new FormControl(''),
      name: new FormControl(''),
      businessId: new FormControl('')
    });
  }

  onFormSubmit(){

    this.useredit ={
      username: this.profileForm.value.username,
    }
    this.editInfoService.getUser().subscribe({
      next: (data)=>{
        this.user=data;
        this.authService.editProfile(this.useredit, this.user.id).subscribe({
          next: (data)=>{
      }
    })}})
  

  this.vendor={
    name: this.profileForm.value.name,
    businessId: this.profileForm.value.businessId
  }
  this.vendorService.updateVendor(this.vendor).subscribe({
    next: (data)=>{
}
  })
  this.router.navigateByUrl('/vendor');
}





}


