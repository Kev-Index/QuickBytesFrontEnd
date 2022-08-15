import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Combo } from 'src/app/model/combo.model';
import { ComboService } from 'src/app/service/combo.service';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.css']
})
export class ComboComponent implements OnInit {

  vendorId: string;
  combos: Combo[];
  size: number;
  constructor(private actRoute: ActivatedRoute,
    private comboService: ComboService) {}

  ngOnInit(): void {
    this.vendorId= this.actRoute.snapshot.paramMap.get('vendorId');
    this.size = 5;
    this.comboService.getCombosByVendor(this.vendorId, 0,this.size).subscribe(data=>{
      this.combos= data;
    });

  }
  prev(): void {
    //read the value of page from subject

     let currentPage = this.comboService.page$.getValue();
    //update the value of page
    if(currentPage >0){
     currentPage = currentPage-1;
     //attach the updated value to the subject
      this.comboService.page$.next(currentPage);
      this.comboService.getCombosByVendor(this.vendorId, currentPage,5).subscribe(data=>{
        this.combos= data;
      });
    }
  }

  next(): void {
    let currentPage = this.comboService.page$.getValue();
    //update the value of page
    if (currentPage < this.combos.length/5){
    currentPage = currentPage+1;
    //attach the updated value to the subject
      this.comboService.page$.next(currentPage);
      this.comboService.getCombosByVendor(this.vendorId, currentPage,5).subscribe(data=>{
        this.combos= data;
     });
    }
  }
}
