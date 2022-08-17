import { OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { UserInfo, UserSecurityDto } from './auth/model/user.model';
import { AuthService } from './auth/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  
  

  @ViewChild('sidenav') sidenav: MatSidenav;
  title = 'QuickBytes';
  user:UserSecurityDto;
  username:string;
  role:string;
  roleId:number;
  userId:number;
  
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem("username");

    if(this.username != null){
      this.role = localStorage.getItem("role");
      this.userId = parseInt(localStorage.getItem('userId'));
      this.roleId = parseInt(localStorage.getItem('roleId'));
    }
    this.authService.username$.subscribe(data=>{
      this.username = data;
     console.log(this.username);
   })

    


    
  }

  close(page:string) {
    this.sidenav.close();
  }
}

