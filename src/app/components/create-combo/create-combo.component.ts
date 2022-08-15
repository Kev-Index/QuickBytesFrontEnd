import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Vendor } from 'src/app/model/vendor.model';
import { ComboService } from 'src/app/service/combo.service';
import {Item} from 'src/app/model/item.model';
import { FormControl, FormGroup } from '@angular/forms';
import { UserInfo } from 'src/app/auth/model/user.model';
import { Combo } from 'src/app/model/combo.model';
import { ItemComboService } from 'src/app/service/item-combo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-combo',
  templateUrl: './create-combo.component.html',
  styleUrls: ['./create-combo.component.css']
})
export class CreateComboComponent implements OnInit {

  items: Item[];
  subscriptions: Subscription[]=[];
  subscriptions2: Subscription[]=[];
  page: number;
  size:number;
  vendor: Vendor;
  names: String[]=[];
  prices: Number[]=[];
  x: string;
  user: UserInfo;
  addedItems ={};
  combo: Combo;
  addForm: FormGroup;
  comboname: any;
  comboprice: any;
  msg: string;
  comboItems: Item[]=[];
  combos: Combo[];
  xx: number;

  
  constructor(private comboService: ComboService, private itemComboService: ItemComboService, private router: Router) { 
  }

  async delay(ms: number) {
    await new Promise<void>(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
}

  ngOnInit(): void {
    this.addForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl('')
    });
      this.subscriptions.push(
      this.comboService.page$.subscribe(value=>{
        this.page = value;
        this.comboService.getAllItems(this.page,this.size)
        .subscribe({
          next: (data)=>{
              this.items = data;
              this.comboService.item$.next(this.items);
          }})}))
          this.subscriptions.push(
            this.comboService.page$.subscribe(value=>{
              this.page = value;
              this.comboService.getCombos(this.page,this.size)
              .subscribe({
                next: (data)=>{
                    this.combos = data;
                    this.comboService.combo$.next(this.combos);
                }})}))
          error: (e)=>{
            //redirect to error page
          }
  }
  onAdd(event){
    var name=event.target.id;
    for (let i = 0; i < this.items.length; i++) {
      if(name==this.items[i].name){
        var price=this.items[i].price;
        this.comboItems.push(this.items[i]);
      }
    }
    this.names.push(name);

  } 

  onFormSubmit(){
    this.combo=this.addForm.value;
    console.log(this.combo);
    this.subscriptions.push(
    this.comboService.postCombo(this.combo).subscribe({
      next: (data)=> {
        this.combo=data;
        console.log(data);
        for (let i=0; i<this.comboItems.length; i++){
        this.itemComboService.postCombo(this.combo.comboId, this.comboItems[i].itemId).subscribe({
          next: (data)=>{
            console.log(data);
          }
        })}
        this.subscriptions.push(
          this.comboService.page$.subscribe(value=>{
            this.page = value;
            this.comboService.getCombos(this.page,this.size)
            .subscribe({
              next: (data)=>{
                  this.combos = data;
                  this.comboService.combo$.next(this.combos);
              }})}))
     this.xx=this.comboItems.length;     
    for (let i=0; i<this.xx; i++){
    this.comboItems.pop();
    this.names.pop();  
    }     
    this.router.navigateByUrl('/create-combo');   
    this.addForm.reset();  
    }}))
    
  }
  onEdit(event){

  }

  onDelete(event){

  }

  }

