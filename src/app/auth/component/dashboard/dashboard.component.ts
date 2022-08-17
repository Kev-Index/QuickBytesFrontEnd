import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('username')==null){
      this.router.navigateByUrl("/login");
    } 
    else if (localStorage.getItem('role')=='customer') {
      this.router.navigateByUrl("/customer");
    }
    else if(localStorage.getItem('role')=='vendor') {
      this.router.navigateByUrl("/vendor");
    }
    else if(localStorage.getItem('role')=='admin') {
      this.router.navigateByUrl("/admin");
    }
    else{
      this.router.navigateByUrl("/login");
    }

  }
}
