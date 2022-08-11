import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Vendor } from 'src/app/model/vendor.model';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-admin-report-page',
  templateUrl: './admin-report-page.component.html',
  styleUrls: ['./admin-report-page.component.css']
})
export class AdminReportPageComponent implements OnInit {

  vendorFormGroup: FormGroup = this.formBuilder.group({vendorControl: ['']});
  vendorFormControl = new FormControl('', Validators.required);
  typeFormGroup: FormGroup = this.formBuilder.group({typeControl: ['']});
  typeFormControl = new FormControl('', Validators.required);
  animationDuration = "1000";

  //needs real data
  vendors: Vendor[];

  constructor(private formBuilder: FormBuilder, private vendorService: VendorService) {}


  ngOnInit(): void {
    this.vendorService.getVendors().subscribe({
      next: (data) => {
        this.vendors = data;
        console.log(this.vendors);
      },
      error: (e) => { }
    })
  }

  generateReport(): void {
    if (this.vendorFormControl.value !== "" && this.typeFormControl.value !== "") {
      console.log(this.vendorFormControl.value);
      //report logic
    } else {
      console.log("try again");
    }
  }
}