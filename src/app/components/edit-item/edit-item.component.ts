import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item, ItemDto } from 'src/app/model/item.model';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  itemId:string;
  itemDto:ItemDto;
  editItemForm:FormGroup; 
  constructor(private actRoute:ActivatedRoute, private router:Router,private itemService:ItemService) {
  }

  ngOnInit(): void {
    this.editItemForm = new FormGroup({
        name: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z ]+$/)]),
        price: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*\.[0-9]{2}$/)]),
        quantity: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      });
      
      this.itemService.getItem(this.itemId).subscribe(data=>{
        this.itemDto.name = data.name;
        this.itemDto.price = data.price;
        this.itemDto.quantity = data.quantity;
        
        this.editItemForm.controls['name'].setValue(this.itemDto.name);
        this.editItemForm.controls['price'].setValue(this.itemDto.price);
        this.editItemForm.controls['quantity'].setValue(this.itemDto.quantity);
      });
  }

  onFormSubmit(){
    this.itemDto={
      itemId: this.actRoute.snapshot.paramMap.get('itemId'),
      name: this.editItemForm.value.name,
      price:this.editItemForm.value.price,
      quantity:this.editItemForm.value.quantity
    };

    this.itemService.editItem(this.itemDto).subscribe({
      next:(d)=>{
        this.itemService.message$.next('SignUp Success, Please Login')
        //the redirect is not made yet, make it James
        this.router.navigateByUrl('/items/9');
      }
    })
  }

}
