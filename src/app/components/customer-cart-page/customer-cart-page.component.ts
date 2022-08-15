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
    this.requestService.fetchRequestByCustomerId(this.authService.roleId$.value).subscribe({
      next: (data) => {
        this.requests = data;
        this.fetchActiveRequest();
        this.fetchRequestItemsAndCombos();
      },
      error: (e) => { }
    });
  }

  fetchActiveRequest(): void {
    this.requests.forEach((request) => {
      if (request.status === this.REQUEST_STATUSES[0]) {
        this.activeRequest = request;
      }
    });
  }

  fetchRequestItemsAndCombos(): void {
    this.requestItemService.fetchRequestItemsByRequestId(this.activeRequest.requestId).subscribe({
      next: (data) => {
        this.requestItems = data;
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

  confirmOrder(): void {
    this.matTabIndex = this.matTabIndex+1;
  }
  
  placeOrder(): void {
    this.requestService.pendRequest(this.activeRequest.requestId).subscribe({
      next: (data) => { 
        this.router.navigateByUrl("/dashboard");
        this.snackBar.open("Your order has been placed!", "OK");
        
      },
      error: (e) => { }
    });
  }

}
