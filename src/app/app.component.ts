import { OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from './auth/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router) {}
  username: string;
  
  @ViewChild('sidenav') sidenav: MatSidenav;
  title = 'QuickBytes';

  close(page:string) {
    this.sidenav.close();
  }
  ngOnInit(): void {
    this.authService.username$.subscribe(data=>{
       this.username = data;
      console.log(this.username);
    })
}
}

