import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-customer-dashboard-shoppingcart',
  templateUrl: './customer-dashboard-shoppingcart.component.html',
  styleUrls: ['./customer-dashboard-shoppingcart.component.css']
})
export class CustomerDashboardShoppingcartComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  viewMenu(vendor:number){
    localStorage.setItem('vendorId', vendor.toString());
    this.router.navigateByUrl("/customer/menu");
    //+ vendor.toString).then((value)=>{location.reload()});
  }
}
