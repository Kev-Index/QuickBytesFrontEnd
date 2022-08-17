import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { CustomerService } from 'src/app/service/customer.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit{


  dataSource: MatTableDataSource<Customer>;
  displayedColumns: string[] = ['customerId','firstName','lastName','balance'];
  customers: Customer[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private actRoute: ActivatedRoute,
    private customerService: CustomerService) {}


  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(data=>{
      this.customers= data;
      this.dataSource = new MatTableDataSource(this.customers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
