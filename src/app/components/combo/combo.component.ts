import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Combo } from 'src/app/model/combo.model';
import { ComboService } from 'src/app/service/combo.service';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.css']
})
export class ComboComponent implements OnInit{

  vendorId: string;
  combos: Combo[];
  dataSource: MatTableDataSource<Combo>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  displayedColumns: string[] = ['name','price','available'];
  constructor(private actRoute: ActivatedRoute,
    private comboService: ComboService) {}


  ngOnInit(): void {
    this.vendorId= this.actRoute.snapshot.paramMap.get('vendorId');
    this.comboService.getCombosByVendor(this.vendorId).subscribe(data=>{
      this.combos= data;
      this.dataSource = new MatTableDataSource(this.combos);
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
