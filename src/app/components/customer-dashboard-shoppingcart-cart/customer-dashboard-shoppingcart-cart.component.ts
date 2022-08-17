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

  constructor(private router:Router) { }

  ngOnInit(): void { }

  checkout(){
    this.router.navigateByUrl('/cart');
  }
}
