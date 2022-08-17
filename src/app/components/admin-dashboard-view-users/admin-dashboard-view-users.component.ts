import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from 'src/app/auth/model/user.model';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-admin-dashboard-view-users',
  templateUrl: './admin-dashboard-view-users.component.html',
  styleUrls: ['./admin-dashboard-view-users.component.css']
})
export class AdminDashboardViewUsersComponent implements OnInit {
  users: UserInfo[];
  dataSource: MatTableDataSource<UserInfo>;
  displayedColumns: string[] = ['username','id','role'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private actRoute: ActivatedRoute,
    private authService: AuthService) {}
  ngOnInit(): void {

    this.authService.getUsers().subscribe(data=>{
      this.users= data;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
