import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {animate, state, style, transition, trigger} from '@angular/animations';
import { Item } from 'src/app/model/item.model';
import { ItemService } from 'src/app/service/item.service';
import { RequestService } from 'src/app/service/request.service';
import { CustomerService } from 'src/app/service/customer.service';
import { Request } from 'src/app/model/request.model';
import { RequestItemService } from 'src/app/service/request-item.service';
import { Customer } from 'src/app/model/customer.model';
import { Vendor } from 'src/app/model/vendor.model';
import { RequestItem } from 'src/app/model/requestItem.model';
import { Router } from '@angular/router';
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
  requests:Request[];
  activeRequest: Request;
  requestItem: RequestItem;
  REQUEST_STATUSES = ['IN_PROGRESS', 'PENDING', 'APPROVED', 'DENIED'];
  var = new Date();

  requestTemplate: Request={
    totalPrice:0,
    status:"0",
    orderTime: "2022-08-15",
    endTime:"2022-08-15"
  };
  // END OF ADD ITEM
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private itemsService:ItemService, private requestService:RequestService, 
              private customerService:CustomerService, private requestItemService:RequestItemService,
              private router:Router) {
    this.vendorId = localStorage.getItem('vendorId');
    // Assign the data to the data source for the table to render
  }
  ngOnInit(): void {

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
    this.customerService.getCustomerById().subscribe({
      next:(data)=>{
        let customerId = data.customerId;
        this.requestService.fetchRequestByCustomerId(customerId).subscribe({
          next:(data)=>{
            this.requests = data;

            this.requests.forEach((request) => {
              if (request.status === this.REQUEST_STATUSES[0] && request.vendor.vendorId != item.vendor.vendorId){
                this.router.navigateByUrl('/dashboard')
              }
                
            });
            this.requests.forEach((request) => {
              if (request.status === this.REQUEST_STATUSES[0] && request.vendor.vendorId == item.vendor.vendorId) {
                this.activeRequest = request;
                this.requestService.updateRequestPrice(this.activeRequest.requestId,item.price).subscribe({
                  next:(data)=>{
                    this.requestItem = data;
                    this.requestItemService.postRequestItem(this.requestItem.requestItemId,this.requestItem.item.itemId).subscribe({
                      next:(data)=>{
                      }
                    });
                  }
                });
              }
            });

            this.requestService.postRequest(this.requestTemplate,parseInt(localStorage.getItem('roleId')),item.vendor.vendorId).subscribe({
              next:(data)=>{
                this.request = data;
                this.requestItemService.postRequestItem(this.request.requestId,item.itemId).subscribe({
                  next:(data)=>{
                  }
                })
              }
            });
          }
        })
      }
    });
  }
}
