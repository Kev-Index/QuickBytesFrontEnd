import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { RequestCombo } from 'src/app/model/requestCombo.model';
import { RequestItem } from 'src/app/model/requestItem.model';
import { RequestComboService } from 'src/app/service/request-combo.service';
import { RequestItemService } from 'src/app/service/request-item.service';
import { RequestService } from 'src/app/service/request.service';
import { Request } from '../../model/request.model';

@Component({
  selector: 'app-customer-cart-page',
  templateUrl: './customer-cart-page.component.html',
  styleUrls: ['./customer-cart-page.component.css']
})

export class CustomerCartPageComponent implements OnInit {

  REQUEST_STATUSES = ['IN_PROGRESS','PENDING','APPROVED','DENIED'];
  requests: Request[];
  activeRequest: Request;
  requestItems: RequestItem[];
  requestCombos: RequestCombo[]

  public matTabIndex = 0;

  constructor(private router: Router, private authService: AuthService, 
              private requestService: RequestService, private requestItemService: RequestItemService, 
              private requestComboService: RequestComboService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.requestService.fetchRequestByCustomerId(parseInt(localStorage.getItem('roleId'))).subscribe({
      next: (data) => {
        this.requests = data;
        this.fetchActiveRequest();
        this.fetchRequestItemsAndCombos();
      },
      error: (e) => { }
    });
  }

  /**
   * Fetch currently active request from list of fetched requests
   */
  fetchActiveRequest(): void {
    this.requests.forEach((request) => {
      if (request.status === this.REQUEST_STATUSES[0]) {
        this.activeRequest = request;
      }
    });
  }

  /**
   * Fetch request items & combos from currently active request
   */
  fetchRequestItemsAndCombos(): void {
    this.requestItemService.fetchRequestItemsByRequestId(this.activeRequest.requestId).subscribe({
      next: (data) => {
        this.requestItems = data;
        if(this.requestItems.length<1) {
          this.requestService.deleteRequest(this.activeRequest.requestId).subscribe({
            next: (data) => {
              location.reload();
            },
            error: (e) => { }
          })
        }
      },
      error: (e) => { }
    });

    this.requestComboService.fetchRequestCombosByRequestId(this.activeRequest.requestId).subscribe({
      next: (data) => {
        this.requestCombos = data;
      },
      error: (e) => { }
    });
  }

  /**
   * Navigate to final tab
   */
  confirmOrder(): void {
    this.matTabIndex = this.matTabIndex+1;
  }
  
  /**
   * Contact API to put request status
   */
  placeOrder(): void {
    this.requestService.pendRequest(this.activeRequest.requestId).subscribe({
      next: (data) => { 
        this.router.navigateByUrl("/dashboard");
        this.snackBar.open("Your order has been placed!", "OK");
        
      },
      error: (e) => { }
    });
  }

  /**
   * Remove requestItem from DB and update UI
   * @param requestItem 
   */
  removeItem(requestItem: RequestItem): void {
    this.requestItemService.deleteRequestItemById(requestItem.requestItemId).subscribe({
      next: (data) => { 
        let newRequestItemPrice = requestItem.request.totalPrice - requestItem.item.price;
        this.requestService.updateRequestPrice(requestItem.request.requestId,newRequestItemPrice).subscribe({
          next: (data) => { 
            location.reload();
          },
          error: (e) => { }
        });
      },
      error: (e) => { }
    });
  }

  /**
   * Remove requestCombo from DB and update UI
   * @param requestCombo 
   */
  removeCombo(requestCombo: RequestCombo): void {
    this.requestComboService.deleteRequestComboById(requestCombo.requestComboId).subscribe({
      next: (data) => { 
        let newRequestComboPrice = requestCombo.requestId.totalPrice - requestCombo.comboId.price;
        this.requestService.updateRequestPrice(requestCombo.requestId.requestId,newRequestComboPrice).subscribe({
          next: (data) => { 
            location.reload();
          },
          error: (e) => { }
        });
      },
      error: (e) => { }
    });
  }

}
