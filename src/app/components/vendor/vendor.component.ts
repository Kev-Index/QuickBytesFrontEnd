import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Vendor } from 'src/app/model/vendor.model';
import { ComboService } from 'src/app/service/combo.service';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  
  
  subscriptions: Subscription[]=[];
  page: number;
  size: number;
  vendor: Vendor;

  constructor(private authService: AuthService, private router: Router, private comboService: ComboService, private vendorService: VendorService) { }

 

  ngOnInit(): void {
    this.comboService.getUser();
        this.vendorService.setVendor();
        this.vendor=this.vendorService.getVendor();
    
  }
  
onEdit(event){
  this.router.navigateByUrl('/edit-info');
}

}
