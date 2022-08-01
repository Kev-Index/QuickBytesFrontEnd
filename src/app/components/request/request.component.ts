import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Request } from 'src/app/model/request.model';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  requestForm:FormGroup;
  errorMsg:string;
  requests:Request[];
  message:string;

  constructor(private requestService:RequestService) { }

  ngOnInit(): void {
    this.message='';
    this.requestForm = new FormGroup({
      vendorId: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      customerId: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      totalPrice: new FormControl('', [Validators.required, Validators.pattern(/^[0-9.]+$/)]),
      status: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z_ ]+$/)]),
      orderTime: new FormControl('', [Validators.required, Validators.pattern(/^[0-9-]+$/)]),
      endTime: new FormControl('', [Validators.required, Validators.pattern(/^[0-9-]+$/)])
    });
    
    this.errorMsg='';
    this.requestService.fetchRequests().subscribe({
      next: (data) => {
        this.requests = data;
      },
      error: (e) => {this.errorMsg='Requests could not be fetched...'}
    })
  }

  onFormSubmit() {
    let request:Request={
      totalPrice:this.requestForm.value.totalPrice,
      status:this.requestForm.value.status,
      orderTime:this.requestForm.value.orderTime,
      endTime:this.requestForm.value.endTime
    };

    this.requestService.postRequest(request,this.requestForm.value.vendorId,this.requestForm.value.customerId).subscribe({
      next: (data) => {
        this.message="Category added successfully...";
      },
      error: (e) => {
        this.errorMsg="Category not added successfully...";
        console.log(e);
      }
    })
  }
}
