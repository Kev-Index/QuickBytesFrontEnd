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
  constructor(private actRoute: ActivatedRoute,
    private itemService: ItemService) {}

  ngOnInit(): void {
    this.vendorId= this.actRoute.snapshot.paramMap.get('vendorId');
    this.itemService.getItemsByVendor(this.vendorId).subscribe(data=>{
      this.items= data;
    });
  }

}
