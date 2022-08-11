import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Vendor } from 'src/app/model/vendor.model';
import { VendorService } from 'src/app/service/vendor.service';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

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

  vendors: Vendor[];
  reportTypes: String[] = ["Total Profit", "Orders Completed", "Most Popular Items"];

  //needs real data
  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ];
  public pieChartDatasets = [ {
    data: [ 300, 500, 100 ]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  // Doughnut
  public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
      { data: [ 350, 450, 100 ], label: 'Series A' },
      { data: [ 50, 150, 120 ], label: 'Series B' },
      { data: [ 250, 130, 70 ], label: 'Series C' }
    ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };

  // Bar
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

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

  generateReport(stepper:MatStepper): void {
    if (this.vendorFormControl.value !== "" && this.typeFormControl.value !== "") {
      console.log(this.vendorFormControl.value, this.typeFormControl.value);
      //report logic
    } else {
      stepper.reset();
    }
  }
}
