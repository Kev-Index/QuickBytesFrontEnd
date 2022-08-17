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
  activeRequestExists:boolean = false;
  vendorRequestExists:boolean = false;
  request:Request;
  requests:Request[];
  activeRequest: Request;
  requestItem: RequestItem;
  REQUEST_STATUSES = ['IN_PROGRESS', 'PENDING', 'APPROVED', 'DENIED'];
  var = new Date();

  requestTemplate: Request={
    totalPrice:0,
    status:"0",
    orderTime: "2022-08-17",
    endTime:"2022-08-17"
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
    console.log(this.var);
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
    this.customerService.getCustomerById().subscribe({
      next:(data)=>{
        let customerId = data.customerId;
        this.requestService.fetchRequestByCustomerId(customerId).subscribe({
          next:(data)=>{
            this.requests = data;

            //REDIRECT IF ACTIVE REQUEST EXISTS FOR ANOTHER VENDOR
            this.requests.forEach((request) => {
              if (request.status === this.REQUEST_STATUSES[0] && request.vendor.vendorId != item.vendor.vendorId){
                this.activeRequestExists = true;
                localStorage.setItem('vendorId',request.vendor.vendorId.toString());
                this.router.navigateByUrl('/customer/menu').then(()=>location.reload());
              }
            });

            if (this.activeRequestExists == false) {
              //IF ACTIVE REQUEST EXISTS
              this.requests.forEach((request) => {
                if (request.status === this.REQUEST_STATUSES[0] && request.vendor.vendorId == item.vendor.vendorId) {
                  this.vendorRequestExists = true;
                  this.activeRequest = request;
                  let newTotalPrice = this.activeRequest.totalPrice + item.price;
                  this.requestService.updateRequestPrice(this.activeRequest.requestId,newTotalPrice).subscribe({
                    next:(data)=>{
                      this.requestItemService.postRequestItem(this.activeRequest.requestId,item.itemId).subscribe({
                        next:(data)=>{ }
                      });
                    }
                  });
                }
              });
            }

            //IF NO CURRENTLY ACTIVE REQUEST FOR SELECTED VENDOR
            if (!this.vendorRequestExists) {
              this.requestTemplate.totalPrice = item.price;
              this.requestService.postRequest(this.requestTemplate,parseInt(localStorage.getItem('roleId')),item.vendor.vendorId).subscribe({
                next:(data)=>{
                  this.request = data;
                  this.requestItemService.postRequestItem(this.request.requestId,item.itemId).subscribe({
                    next:(data)=>{ }
                  })
                }
              });
            }
          }
        })
      }
    });
  }
}
