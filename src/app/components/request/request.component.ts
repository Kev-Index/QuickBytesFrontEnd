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
  request:Request;
  message:string;

  constructor(private requestService:RequestService) { }

  ngOnInit(): void {
    this.message='';
    this.requestForm = new FormGroup({
      vendorId: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
      customerId: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
      totalPrice: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
      status: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
      orderTime: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
      endTime: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)])
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
    this.request = this.requestForm.value;
    this.requestService.postRequest(this.request).subscribe({
      next: (data) => {
        this.message="Category added successfully...";
      },
      error: (e) => {
        this.errorMsg="Category not added successfully...";
      }
    })
  }
}
