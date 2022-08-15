import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestItem } from 'src/app/model/requestItem.model';
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
  requests: Request[] = [ ];
  pendingRequests: Request[] = [ ];
  pendingRequestItems: RequestItem[][] = [ ];

  constructor(private requestService: RequestService, private requestItemService: RequestItemService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.requestService.fetchRequests().subscribe({
      next: (data) => {
        this.requests = data;
        this.fetchPendingRequests();
      },
      error: (e) => { }
    });
  }

  fetchPendingRequests() {
    this.requests.forEach((request) => {
      if (request.status === this.REQUEST_STATUSES[1]) {
        this.pendingRequests.push(request);
        this.fetchPendingRequestItems();
      }
    });
  }
 
  fetchPendingRequestItems() {
    this.pendingRequests.forEach((pendingRequest) => {
      this.requestItemService.fetchRequestItemsByRequestId(pendingRequest.requestId).subscribe({
        next: (data) => {
          this.pendingRequestItems.push(data);
        },
        error: (e) => { }
      });
    });
  }

  approveRequest(request: Request) {
    this.requestService.approveRequest(request.requestId).subscribe({
      next: (data) => { 
        location.reload();
      },
      error: (e) => { }
    });
  }

  denyRequest(request: Request) {
    this.requestService.denyRequest(request.requestId).subscribe({
      next: (data) => { 
        location.reload();
      },
      error: (e) => { }
    });
  }
}
