import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';
import { Vendor } from 'src/app/model/vendor.model';
import { ItemService } from 'src/app/service/item.service';
import { ViewChild } from '@angular/core';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-customer-dashboard-shoppingcart',
  templateUrl: './customer-dashboard-shoppingcart.component.html',
  styleUrls: ['./customer-dashboard-shoppingcart.component.css']
})

export class CustomerDashboardShoppingcartComponent implements OnInit {
  columnsToDisplay = ['name'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Vendor | null;

  vendors:Vendor[];
  dataSource: MatTableDataSource<Vendor>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router:Router, private vendorService:VendorService) { }

  ngOnInit(): void {
    this.vendorService.getVendorsMenu().subscribe({
      next:(data)=>{
        this.vendors = data;
        this.dataSource = new MatTableDataSource(this.vendors);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  viewMenuMain(vendor:any){
    if (typeof vendor==='number'){
      localStorage.setItem('vendorId', vendor.toString());
    }
    else{
      localStorage.setItem('vendorId',vendor.vendorId.toString());
    }
    this.router.navigateByUrl("/customer/menu").then((data) => {
      location.reload();
    }); 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

