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
  MOST_POPULAR_ITEMS = "Most Popular Items";
  DAILY_REPORT = "Daily Report";

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
  reportTypes: String[] = [this.TOTAL_PROFIT, this.MOST_POPULAR_ITEMS, this.DAILY_REPORT,
                          this.TOTAL_PROFIT + " + " + this.MOST_POPULAR_ITEMS, 
                          this.MOST_POPULAR_ITEMS + " + " + this.DAILY_REPORT,
                          this.TOTAL_PROFIT + " + " + this.MOST_POPULAR_ITEMS + " + " + this.DAILY_REPORT];
  
  //  Total Profit Per Item | Pie Chart 
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels: String[] = [ ];
  public pieChartDatasets = [ {
    data: []
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [ ];

  // Most Popular Items | Doughnut Chart
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };
  public doughnutChartLabels: string[] = [ ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [ ], label: 'Most Popular Items' }
  ];

  // Daily Report | Bar Chart
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ ],
    datasets: [
      { data: [ ], label: 'Orders Completed Per Day' },
      { data: [ ], label: 'Revenue Per Day' }
    ]
  };
  public barChartLegend = true;
  public barChartPlugins = [ ];

  constructor(private formBuilder: FormBuilder, private vendorService: VendorService, 
              private requestService: RequestService, private requestItemService: RequestItemService) { }


  ngOnInit(): void {
    this.vendorService.getVendors().subscribe({
      next: (data) => {
        this.vendors = data;
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
      let chartTypes = this.typeFormControl.value.split(" + ");

      this.requestService.fetchRequestsByVendorId(this.vendorFormControl.value['vendorId']).subscribe({
        next: (requests) => {
          // TOTAL PROFIT REPORT
          if(chartTypes.includes(this.TOTAL_PROFIT)) {
            this.generateTotalProfitReport(requests);
            this.displayProfit = true;
          } else {
            this.displayProfit = false;
          }

          // MOST POPULAR ITEM REPORT
          if(chartTypes.includes(this.MOST_POPULAR_ITEMS)) {
            this.generateMostPopularReport(requests);
            this.displayPopular = true;
          } else {
            this.displayPopular = false;
          }

          // DAILY REPORT
          if(chartTypes.includes(this.DAILY_REPORT)) {
            this.generateOrdersCompletedReport(requests);
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

  /**
   * Fetch all request items for each request & populate donut chart with fetched data
   * @param requests 
   */
  generateMostPopularReport(requests: Request[]) {
    requests.forEach((request) => {
      if (request.status == "APPROVED") {
          this.requestItemService.fetchRequestItemsByRequestId(request.requestId).subscribe({
            next: (requestItems) => {
              this.populateDonutChartLabels(requestItems);
              this.populateDonutChartData(requestItems);
            },
            error: (e) => { }
          });
      }
    });
  }

  /**
   * Populate doughnut chart's labels for most popular item report
   * @param requestItems 
   */
  populateDonutChartLabels(requestItems: RequestItem[]) {
    requestItems.forEach((requestItem) => {
      this.doughnutChartLabels.push(requestItem.item.name);
    });
    this.doughnutChartLabels = [...new Set(this.doughnutChartLabels)];
  }

  /**
   * Populate doughnut chart's data for most popular item report
   * @param requestItems 
   */
  private populateDonutChartData(requestItems: RequestItem[]) {
    requestItems.forEach((requestItem) => {
      let labelIndex = this.doughnutChartLabels.indexOf(requestItem.item.name);
      if (!this.doughnutChartDatasets[0].data[labelIndex]) {
        this.doughnutChartDatasets[0].data.splice(labelIndex, 0, 1);
      } else {
        let currentRequestItemTotal = this.doughnutChartDatasets[0].data[labelIndex] + 1;
        this.doughnutChartDatasets[0].data.splice(labelIndex, 1, currentRequestItemTotal);
      }
    });
  }

  /**
   * Fetch all requests & populate bar chart with fetched data
   * @param requests 
   */
  generateOrdersCompletedReport(requests: Request[]) {
    this.populateBarChartLabels(requests);
    this.populateBarChartData(requests);
  }

  /**
   * Populate bar chart's labels for daily report
   * @param requests 
   */
  populateBarChartLabels(requests: Request[]) {
    requests.forEach((request) => {
      if (request.status == "APPROVED") {
        this.barChartData.labels.push(request.endTime);
      }
    });
    this.barChartData.labels = [...new Set(this.barChartData.labels)];
    console.log(this.barChartData.labels);
  }

  /**
   * Populate bar chart's data for daily report
   * @param requests 
   */
  populateBarChartData(requests: Request[]) {
    requests.forEach((request) => {
      let labelIndex = this.barChartData.labels.indexOf(request.endTime);
      if (!this.barChartData.datasets[0].data[labelIndex]) {
        this.barChartData.datasets[0].data.splice(labelIndex, 0, 1);
      } else {
        let currentRequestTotal = this.barChartData.datasets[0].data[labelIndex] + 1;
        this.barChartData.datasets[0].data.splice(labelIndex, 1, currentRequestTotal);
      }

      if (!this.barChartData.datasets[1].data[labelIndex]) {
        this.barChartData.datasets[1].data.splice(labelIndex, 0, request.totalPrice);
      } else {
        let currentRequestProfitTotal = this.barChartData.datasets[1].data[labelIndex] + request.totalPrice;
        this.barChartData.datasets[1].data.splice(labelIndex, 1, currentRequestProfitTotal);
      }
    });
  }
}
