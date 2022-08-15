import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;
  title = 'QuickBytes';
  role = localStorage.getItem('role');

  close(page:string) {
    this.title=page;
    this.sidenav.close();
  }
}
