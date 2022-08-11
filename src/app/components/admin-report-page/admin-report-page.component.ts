import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

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
  vendors: String[] = ["Dog","Cat","Meow"];

  constructor(private formBuilder: FormBuilder) {}


  ngOnInit(): void {
  }

  generateReport(): void {
    if (this.vendorFormControl.value !== "" && this.typeFormControl.value !== "") {
      console.log("generating");
      //report logic
    } else {
      console.log("try again");
    }
  }
}
