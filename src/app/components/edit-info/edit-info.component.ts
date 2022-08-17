import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NumberValueAccessor } from '@angular/forms';
import { UserEditDto, UserInfo } from 'src/app/auth/model/user.model';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Vendor, VendorEditDto } from 'src/app/model/vendor.model';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent implements OnInit {
  user: UserEditDto;
  profileForm: FormGroup;
  username: string;
  vendor: VendorEditDto;
  name: string;
  businessId: number;

 
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      username: new FormControl(''),
      name: new FormControl(''),
      businessId: new FormControl('')
    });
  }

  onFormSubmit(){
  
    this.user ={
      username: this.profileForm.value.username,
    }
    this.authService.editProfile(this.user).subscribe({
      next: (data)=>{

  }})

  this.vendor={
    name: this.profileForm.value.name,
    businessId: this.profileForm.value.businessId
  }


}

}
