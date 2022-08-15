import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { UserInfo, UserSecurityDto } from './auth/model/user.model';
import { AuthService } from './auth/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{
  @ViewChild('sidenav') sidenav: MatSidenav;
  title = 'QuickBytes';
  user:UserSecurityDto;
  username:string;
  role:string;
  roleId:number;
  userId:number;
  
  constructor (private authService: AuthService){

  }

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    if(this.username != null){
      this.role = localStorage.getItem("role");
      this.userId = parseInt(localStorage.getItem('userId'));
      this.roleId = parseInt(localStorage.getItem('roleId'));
    }
  }
  ngOnDestroy(): void {
    this.authService.roleId$.unsubscribe();
    this.authService.userId$.unsubscribe();
  }

 

  close(page:string) {
    this.title=page;
    this.sidenav.close();
  }
}
