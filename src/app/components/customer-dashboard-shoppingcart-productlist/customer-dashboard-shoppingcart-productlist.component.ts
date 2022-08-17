import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

/*
@Component({
  selector: 'app-customer-dashboard-shoppingcart-productlist',
  templateUrl: './customer-dashboard-shoppingcart-productlist.component.html',
  styleUrls: ['./customer-dashboard-shoppingcart-productlist.component.css']
})
export class CustomerDashboardShoppingcartProductlistComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
*/

import {animate, state, style, transition, trigger} from '@angular/animations';
import { Item } from 'src/app/model/item.model';
import { ItemService } from 'src/app/service/item.service';
import { RequestService } from 'src/app/service/request.service';
import { CustomerService } from 'src/app/service/customer.service';
import { Request } from 'src/app/model/request.model';
@Component({
  selector: 'app-customer-dashboard-shoppingcart-productlist',
  templateUrl: './customer-dashboard-shoppingcart-productlist.component.html',
  styleUrls: ['./customer-dashboard-shoppingcart-productlist.component.css']
})

export class CustomerDashboardShoppingcartProductlistComponent {
  columnsToDisplay = ['name', 'price'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Item | null;

  dataSource: MatTableDataSource<Item>
  item:Item;
  items: Item[];
  vendorId: string;

  // START OF ADD ITEM
  request:Request;
  // END OF ADD ITEM
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private itemsService:ItemService, private requestService:RequestService, private customerService:CustomerService) {
    this.vendorId = localStorage.getItem('vendorId');
    // Assign the data to the data source for the table to render
  }
  ngOnInit(): void {
    // START OF ADD ITEM
    this.requestService.fetchRequests().subscribe({
      next: (data) => {
        //console.log(data);
      }
      });
    // END OF ADD ITEM


    this.itemsService.getItemsByVendorId(this.vendorId).subscribe({
      next:(data)=>{
        this.items=data;
        this.dataSource = new MatTableDataSource(this.items);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addItem(item:Item){
    //console.log(item);
    //console.log(item.itemId);
    let request: Request={
      totalPrice:0,
      status:"0",
      orderTime:"2022-08-14",
      endTime:"2022-08-15"
    };

    this.customerService.getCustomerById().subscribe({
      next:(data)=>{
        let customerId = data.customerId;
        this.requestService.fetchRequestByCustomerId(customerId).subscribe({
          next:(data)=>{
            
            // CHECK IF REQUEST EXISTS - If you login to kevin, requsts are shown
            // Use If statement?

            // If no request exists - console.log(data); returns []
            console.log("CUSTOMER ID: " + localStorage.getItem('roleId'));
            console.log("VENDOR ID: " + item.vendor.vendorId);
            console.log("REQUEST:" +request +
            "\nVENDOR ID: " + item.vendor.vendorId,
            "\nCUSTOMER ID: " + localStorage.getItem('roleId'));


            /**
             * this.requestService.postRequest(request,item.vendor.vendorId,parseInt(localStorage.getItem('roleId'))).subscribe({
              next:(data)=>{
                console.log(data);
              }
            });
             */
            this.requestService.postRequest(request,parseInt(localStorage.getItem('roleId')),item.vendor.vendorId).subscribe({
              next:(data)=>{
                console.log(data);
                this.request = data;
                console.log("Current Request: " + this.request);
                let currentRequestId = this.request.requestId;
                let currentCustomer = this.request.customer.customerId;
                let currentVendor = this.request.vendor.vendorId;

              }
            });
            
            
          }
        })
      }
    });
  }
}
