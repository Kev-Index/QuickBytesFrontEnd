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
@Component({
  selector: 'app-customer-dashboard-shoppingcart-productlist',
  templateUrl: './customer-dashboard-shoppingcart-productlist.component.html',
  styleUrls: ['./customer-dashboard-shoppingcart-productlist.component.css']
})


/*
export class CustomerDashboardShoppingcartProductlistComponent {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['name', 'price'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: CultureFoodsElement | null;
}
*/
export class CustomerDashboardShoppingcartProductlistComponent {
  columnsToDisplay = ['name', 'price'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Item | null;

  dataSource: MatTableDataSource<Item>
  items: Item[];
  vendorId: string;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private itemsService:ItemService) {
    this.vendorId = localStorage.getItem('vendorId');
    // Assign the data to the data source for the table to render
  }
  ngOnInit(): void {
    this.itemsService.getItemsByVendorId(this.vendorId).subscribe({
      next:(data)=>{
        this.items=data;
        console.log("This is Items");
        console.log(this.items);
        this.dataSource = new MatTableDataSource(this.items);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
