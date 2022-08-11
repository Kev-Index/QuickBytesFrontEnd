import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/model/item.model';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  vendorId: string;
  items: Item[];
  size: number;
  constructor(private actRoute: ActivatedRoute,
    private itemService: ItemService) {}

  ngOnInit(): void {
    this.vendorId= this.actRoute.snapshot.paramMap.get('vendorId');
    this.size = 5;
    this.itemService.getItemsByVendor(this.vendorId, 0,this.size).subscribe(data=>{
      this.items= data;
    });

  }
  prev(): void {
    //read the value of page from subject

     let currentPage = this.itemService.page$.getValue();
    //update the value of page
    if(currentPage >0){
     currentPage = currentPage-1;
     //attach the updated value to the subject
      this.itemService.page$.next(currentPage);
      this.itemService.getItemsByVendor(this.vendorId, currentPage,5).subscribe(data=>{
        this.items= data;
      });
    }
  }

  next(): void {
    let currentPage = this.itemService.page$.getValue();
    //update the value of page
    if (currentPage < this.items.length/5){
    currentPage = currentPage+1;
    //attach the updated value to the subject
      this.itemService.page$.next(currentPage);
      this.itemService.getItemsByVendor(this.vendorId, currentPage,5).subscribe(data=>{
        this.items= data;
     });
    }
  }
}
