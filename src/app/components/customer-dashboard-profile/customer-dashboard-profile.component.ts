import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserInfo } from 'src/app/auth/model/userInfo.model';
import { Customer } from 'src/app/model/customer.model';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-dashboard-profile',
  templateUrl: './customer-dashboard-profile.component.html',
  styleUrls: ['./customer-dashboard-profile.component.css']
})
export class CustomerDashboardProfileComponent implements OnInit {
  customer:Customer;
  customerProfile:FormGroup;
  userId:UserInfo;
  checked = false;
  indeterminate = false;

  constructor(private customerService:CustomerService) {}
  // calling API do enxt error
  // Subscribe to subject, not need for next
  ngOnInit(): void {
    this.customerService.getCustomerById().subscribe({
      next: (data)=>{
        this.customer = data;
        this.customerProfile = new FormGroup ({        
          employeeId: new FormControl({value: this.customer.employeeId ,disabled:true}),
          firstName: new FormControl({value: this.customer.firstName,disabled:false}),
          lastName: new FormControl({value: this.customer.lastName,disabled:false}),
          username: new FormControl({value: this.customer.userId.username,disabled:true}),
          password: new FormControl({value: this.customer.userId.password,disabled:false}),
          balance: new FormControl({value: this.customer.balance,disabled:false}),
  
          middleName: new FormControl({value: this.customer.middleName,disabled:false}),
          email: new FormControl({value: this.customer.email,disabled:false}),
          phoneNumber: new FormControl({value: this.customer.phoneNumber,disabled:false}),
          birthday: new FormControl({value: this.customer.birthday,disabled:false}),
          preferedName: new FormControl({value: this.customer.preferedName,disabled:false}),
  
          addressLine1: new FormControl({value: this.customer.addressLine1,disabled:false}),
          addressLine2: new FormControl({value: this.customer.addressLine2,disabled:false}),
          suite: new FormControl({value: this.customer.suite,disabled:false}),
          country: new FormControl({value: this.customer.country,disabled:false}),
          state: new FormControl({value: this.customer.state,disabled:false}),
          city: new FormControl({value: this.customer.city,disabled:false}),
          postalCode: new FormControl({value: this.customer.postalCode,disabled:false}),
  
          termAccepted: new FormControl({value: this.customer.termsAccepted,disabled:false}),
          emailVerified: new FormControl({value: this.customer.emailVerified,disabled:false}),
          twoFactorAuth: new FormControl({value: this.customer.twoFactorAuth,disabled:false}),
          phoneVerified: new FormControl({value: this.customer.phoneVerified,disabled:false})
        });
      }
    })
    this.customerService.customer$.subscribe(data=>{
      this.customer=data;  

    });
  }
  onFormSubmit(){
    console.log(this.customer);
    console.log(this.customerProfile.value);
    this.customer = this.customerProfile.value;
    this.customerService.putCustomer(this.customer).subscribe({
      next:(data)=>{
        this.customer=data;
      }
    });

  }

}
