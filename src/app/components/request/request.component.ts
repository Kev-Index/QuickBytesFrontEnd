import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.model';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  errorMsg:string;
  requests:Request[];

  constructor(private requestService:RequestService) { }

  ngOnInit(): void {
    this.errorMsg='';
    this.requestService.fetchRequests().subscribe({
      next: (data) => {
        this.requests = data;
      },
      error: (e) => {this.errorMsg='Requests could not be fetched...'}
    })
  }

}
