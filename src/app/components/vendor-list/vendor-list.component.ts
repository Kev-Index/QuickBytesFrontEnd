import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.model';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
  vendors: Vendor[];
  constructor(private vendorService:VendorService) {}

  ngOnInit(): void {
    this.vendorService.getVendors().subscribe(data=>{
      this.vendors = data;
    })
  }

}
