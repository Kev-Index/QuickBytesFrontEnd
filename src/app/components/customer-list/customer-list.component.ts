import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {


  customers: Customer[];
  size: number;
  constructor(private actRoute: ActivatedRoute,
    private customerService: CustomerService) {}


  ngOnInit(): void {
    this.size = 5;
    this.customerService.getCustomers(0,this.size).subscribe(data=>{
      this.customers= data;
    });

  }

  prev(): void {
    //read the value of page from subject

     let currentPage = this.customerService.page$.getValue();
    //update the value of page
    if(currentPage >0){
     currentPage = currentPage-1;
     //attach the updated value to the subject
      this.customerService.page$.next(currentPage);
      this.customerService.getCustomers(currentPage,5).subscribe(data=>{
        this.customers= data;
      });
    }
  }

  next(): void {
    let currentPage = this.customerService.page$.getValue();
    //update the value of page
    if (currentPage < this.customers.length/this.size){
    currentPage = currentPage+1;
    //attach the updated value to the subject
      this.customerService.page$.next(currentPage);
      this.customerService.getCustomers(currentPage,5).subscribe(data=>{
        this.customers= data;
     });
    }
  }
  ngOnDestroy(): void {
    this.customerService.page$.unsubscribe();
  }

}
