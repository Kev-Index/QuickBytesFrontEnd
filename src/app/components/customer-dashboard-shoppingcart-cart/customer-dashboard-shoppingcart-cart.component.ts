import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'app-customer-dashboard-shoppingcart-cart',
  templateUrl: './customer-dashboard-shoppingcart-cart.component.html',
  styleUrls: ['./customer-dashboard-shoppingcart-cart.component.css']
})

export class CustomerDashboardShoppingcartCartComponent implements OnInit {
  displayedColumns: string[] = ['item', 'cost'];
  transactions: Transaction[] = [
    {item: 'Beach ball', cost: 4},
    {item: 'Towel', cost: 5},
    {item: 'Frisbee', cost: 2},
    {item: 'Sunscreen', cost: 4},
    {item: 'Cooler', cost: 25},
    {item: 'Swim suit', cost: 15},
  ];
  constructor(private router:Router) { }

  ngOnInit(): void {
    console.log(this.transactions);
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }
  checkout(){
    this.router.navigateByUrl('/cart');
  }
}
