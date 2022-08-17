import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/model/item.model';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit{
  vendorId: string;
  items: Item[];
  dataSource: MatTableDataSource<Item>;
  displayedColumns: string[] = ['name','price','quantity', 'editButton'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private actRoute: ActivatedRoute,
    private itemService: ItemService, private router: Router) {}
 


  ngOnInit(): void {
    this.vendorId= this.actRoute.snapshot.paramMap.get('vendorId');
  console.log(this.vendorId);
    this.itemService.getItemsByVendorId(this.vendorId).subscribe(data=>{

      this.items= data;
      this.dataSource = new MatTableDataSource(this.items);
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

  editItem(itemId:number){
    this.router.navigateByUrl("item/edit/"+itemId);
  }


}
