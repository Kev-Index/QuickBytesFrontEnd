import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from 'src/app/model/customer.model';
import { RequestCombo } from 'src/app/model/requestCombo.model';
import { RequestItem } from 'src/app/model/requestItem.model';
import { CustomerService } from 'src/app/service/customer.service';
import { ItemService } from 'src/app/service/item.service';
import { RequestComboService } from 'src/app/service/request-combo.service';
import { RequestItemService } from 'src/app/service/request-item.service';
import { RequestService } from 'src/app/service/request.service';
import { Request } from '../../model/request.model';

@Component({
  selector: 'app-vendor-order-approval-page',
  templateUrl: './vendor-order-approval-page.component.html',
  styleUrls: ['./vendor-order-approval-page.component.css']
})
export class VendorOrderApprovalPageComponent implements OnInit {

  REQUEST_STATUSES = ['IN_PROGRESS','PENDING','APPROVED','DENIED'];
  roleId:number;
  requests: Request[] = [ ];
  pendingRequests: Request[] = [ ];
  pendingRequestItems: RequestItem[][] = [ ];
  pendingRequestCombos: RequestCombo[][] = [ ];

  constructor(private requestService: RequestService, private requestItemService: RequestItemService,
              private requestComboService: RequestComboService, private itemService: ItemService,
              private customerService: CustomerService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.roleId = parseInt(localStorage.getItem('roleId'));
    this.requestService.fetchRequestsByVendorId(this.roleId).subscribe({
      next: (data) => {
        this.requests = data;
        this.fetchPendingRequests();
      },
      error: (e) => { }
    });
  }

  /**
   * Fetch all currently pending requests for this vendor
   */
  fetchPendingRequests() {
    this.requests.forEach((request) => {
      if (request.status === this.REQUEST_STATUSES[1]) {
        this.pendingRequests.push(request);
      }
    });
    this.fetchPendingRequestItems();
    this.fetchPendingRequestCombos();
  }
 
  /**
   * Fetch all pending request items for the fetched requests
   */
  fetchPendingRequestItems() {
    this.pendingRequestItems = [ ];
    this.pendingRequests.forEach((pendingRequest) => {
      this.requestItemService.fetchRequestItemsByRequestId(pendingRequest.requestId).subscribe({
        next: (data) => {
          this.pendingRequestItems.push(data);
        },
        error: (e) => { }
      });
    });
  }

  /**
   * Fetch all pending request combos for the fetched requests
   */
  fetchPendingRequestCombos() {
    this.pendingRequestCombos = [ ];
    this.pendingRequests.forEach((pendingRequest) => {
      this.requestComboService.fetchRequestCombosByRequestId(pendingRequest.requestId).subscribe({
        next: (data) => {
          this.pendingRequestCombos.push(data);
        },
        error: (e) => { }
      });
    });
  }

  /**
   * Update status of Request and RequestItems after APPROVED
   * @param request 
   * @param requestItems 
   */
  approveRequest(request: Request,requestItems: RequestItem[]) {
    if (request.customer.balance > request.totalPrice) {
      this.requestService.approveRequest(request.requestId).subscribe({
        next: (data) => { 
          let newCustomerBalance = request.customer.balance - request.totalPrice;
          this.decreaseCustomerBalance(request.customer,newCustomerBalance);
          this.decreaseItemQuantitiesFromRequestItems(requestItems);
          location.reload();
        },
        error: (e) => { }
      });
    } else {
      this.snackBar.open("Customer has an insufficient balance. Please deny order.", "OK");
    }
  }

  /**
   * Update status of Request to DENIED
   * @param request 
   */
  denyRequest(request: Request) {
    this.requestService.denyRequest(request.requestId).subscribe({
      next: (data) => { 
        location.reload();
      },
      error: (e) => { }
    });
  }

  /**
   * Update Item quantities after approving a Request
   * @param requestItems 
   */
  decreaseItemQuantitiesFromRequestItems(requestItems: RequestItem[]) {
    requestItems.forEach((requestItem) => {
      requestItem.item.quantity = requestItem.item.quantity - 1;
      this.itemService.putItem(requestItem.item).subscribe({
        next: (data) => { },
        error: (e) => { }
      });
    });
  }

  /**
   * Update Customer balance after approving their Request
   * @param customer 
   * @param newCustomerBalance 
   */
  decreaseCustomerBalance(customer:Customer, newCustomerBalance:number) {
    customer.balance = newCustomerBalance;
    this.customerService.putCustomer(customer);
  }
}