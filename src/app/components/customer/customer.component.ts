import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer.model';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer:Customer;
  constructor(private customerService:CustomerService) { }

  ngOnInit(): void {
    this.customerService.getCustomerById().subscribe({
      next: (data)=>{
        this.customer = data;
        this.customerService.customer$.next(this.customer);
      }
    });
  }
}
