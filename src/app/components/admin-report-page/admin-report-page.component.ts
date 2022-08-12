import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Vendor } from 'src/app/model/vendor.model';
import { VendorService } from 'src/app/service/vendor.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { RequestService } from 'src/app/service/request.service';
import { Request } from '../../model/request.model';
import { RequestItemService } from 'src/app/service/request-item.service';
import { RequestItem } from 'src/app/model/requestItem.model';

@Component({
  selector: 'app-admin-report-page',
  templateUrl: './admin-report-page.component.html',
  styleUrls: ['./admin-report-page.component.css']
})
export class AdminReportPageComponent implements OnInit {

  // CONSTANTS
  TOTAL_PROFIT = "Total Profit";
  ORDERS_COMPLETED = "Orders Completed";
  MOST_POPULAR_ITEMS = "Most Popular Items";

  // Form Variables
  vendorFormGroup: FormGroup = this.formBuilder.group({vendorControl: ['']});
  vendorFormControl = new FormControl('', Validators.required);
  typeFormGroup: FormGroup = this.formBuilder.group({typeControl: ['']});
  typeFormControl = new FormControl('', Validators.required);
  animationDuration = "1000";

  // Chart Display Booleans
  displayProfit = false;
  displayPopular = false;
  displayOrders = false;

  // Form Selections
  vendors: Vendor[];
  reportTypes: String[] = [this.TOTAL_PROFIT, this.MOST_POPULAR_ITEMS, this.ORDERS_COMPLETED,
                          this.TOTAL_PROFIT + " + " + this.MOST_POPULAR_ITEMS, 
                          this.MOST_POPULAR_ITEMS + " + " + this.ORDERS_COMPLETED,
                          this.TOTAL_PROFIT + " + " + this.MOST_POPULAR_ITEMS + " + " + this.ORDERS_COMPLETED];
  
  //  Total Profit Per Item | Pie Chart 
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels: String[] = [];
  public pieChartDatasets = [ {
    data: []
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  // Most Popular Items | Doughnut Chart
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };
  public doughnutChartLabels: string[] = [ 'Hot Dog', 'Pizza', 'Pie' ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [ 350, 450, 100 ], label: 'Most Popular Items' },
  ];

  // Orders Completed Per Day | Bar Chart
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Orders Completed Per Day' },
    ]
  };
  public barChartLegend = true;
  public barChartPlugins = [];

  constructor(private formBuilder: FormBuilder, private vendorService: VendorService, 
              private requestService: RequestService, private requestItemService: RequestItemService) { }


  ngOnInit(): void {
    this.vendorService.getVendors().subscribe({
      next: (data) => {
        this.vendors = data;
        console.log(this.vendors);
      },
      error: (e) => { }
    })
  }

  /**
   * Fetch all of current vendor's requests & generate selected report types
   * @param stepper 
   */
  generateReport(stepper:MatStepper): void {
    if (this.vendorFormControl.value !== "" && this.typeFormControl.value !== "") {
      this.requestService.fetchRequestsByVendorId(this.vendorFormControl.value['vendorId']).subscribe({
        next: (requests) => {
          let chartTypes = this.typeFormControl.value.split(" + ");

          // TOTAL PROFIT REPORT
          if(chartTypes.includes(this.TOTAL_PROFIT)) {
            this.generateTotalProfitReport(requests);
          } else {
            this.displayProfit = false;
          }

          // MOST POPULAR ITEM REPORT
          if(chartTypes.includes(this.MOST_POPULAR_ITEMS)) {
            this.displayPopular = true;
          } else {
            this.displayPopular = false;
          }

          // ORDERS COMPLETED BY DATE REPORT
          if(chartTypes.includes(this.ORDERS_COMPLETED)) {
            this.displayOrders = true;
          } else {
            this.displayOrders = false;
          }
        },
        error: (e) => { }
      });
    } else {
      stepper.reset();
    }
  }
  
  /**
   * Fetch all request items for each request & populate pie chart with fetched data
   * @param requests 
   */
  generateTotalProfitReport(requests: Request[]) {
    this.displayProfit = true;
    requests.forEach((request) => {
      if (request.status == "APPROVED") {
          this.requestItemService.fetchRequestItemsByRequestId(request.requestId).subscribe({
            next: (requestItems) => {
              this.populatePieChartLabels(requestItems);
              this.populatePieChartData(requestItems);
            },
            error: (e) => { }
          });
      }
    });
  }

  /**
   * Populate pie chart's labels for total profit report
   * @param requestItems 
   */
  private populatePieChartLabels(requestItems: RequestItem[]) {
    requestItems.forEach((requestItem) => {
      this.pieChartLabels.push(requestItem.item.name);
    });
    this.pieChartLabels = [...new Set(this.pieChartLabels)];
  }

  /**
   * Populate pie chart's data for total profit report
   * @param requestItems 
   */
  private populatePieChartData(requestItems: RequestItem[]) {
    requestItems.forEach((requestItem) => {
      let labelIndex = this.pieChartLabels.indexOf(requestItem.item.name);
      if (!this.pieChartDatasets[0].data[labelIndex]) {
        this.pieChartDatasets[0].data.splice(labelIndex, 0, requestItem.item.price);
      } else {
        let currentRequestItemTotal = this.pieChartDatasets[0].data[labelIndex] + requestItem.item.price;
        this.pieChartDatasets[0].data.splice(labelIndex, 1, currentRequestItemTotal);
      }
    });
  }
}
