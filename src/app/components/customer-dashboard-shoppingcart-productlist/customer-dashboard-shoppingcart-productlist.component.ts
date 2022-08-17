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
export class CustomerDashboardShoppingcartProductlistComponent implements AfterViewInit {
  columnsToDisplay = ['name', 'price'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: CultureFoodsElement | null;
  dataSource: MatTableDataSource<CultureFoodsElement>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    console.log(this.dataSource);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


export interface CultureFoodsElement {
  name: string;
  position: number;
  price:number;
}

const ELEMENT_DATA: CultureFoodsElement[] = [
  {
    position: 1,
    name:"Masala Dosa",
    price:6
  },
  {
    position: 2,
    name:"Dal Makhani",
    price:10
  },
  {
    position: 3,
    name:"Dhokla",
    price:8
  },
  {
    position: 4,
    name:"Chicken Haleem",
    price:12.5
  },
  {
    position: 5,
    name:"Jalfrezi",
    price:12.5
  },
  {
    position: 6,
    name:"Chicken Makhni",
    price:12.5
  },
  {
    position: 7,
    name:"Paneer Karahi",
    price:14
  },
  {
    position: 8,
    name:"Bhindi",
    price:11
  },
  {
    position: 9,
    name:"Tandoori Naan Plain",
    price:2
  },
  {
    position: 10,
    name:"Tandoori Naan Garlic",
    price:4.5
  },
  {
    position: 11,
    name:"Tandoori Naan Peshawari Kulcha",
    price:4.5
  },
];
