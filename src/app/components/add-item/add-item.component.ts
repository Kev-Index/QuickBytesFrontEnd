import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemDto } from 'src/app/model/item.model';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  itemDto:ItemDto;
  itemForm:FormGroup;
  constructor(private actRoute:ActivatedRoute, private router:Router,private itemService:ItemService) { }

  ngOnInit(): void {
    this.itemForm = new FormGroup({
      name: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z ]+$/)]),
      price: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*\.[0-9]{2}$/)]),
      quantity: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    });
  }

  onFormSubmit(){
    this.itemDto={
      vendorId: this.actRoute.snapshot.paramMap.get('vendorId'),
      name: this.itemForm.value.name,
      price:this.itemForm.value.price,
      quantity:this.itemForm.value.quantity

    };
    console.log(this.itemDto);
    this.itemService.addItem(this.itemDto).subscribe({
      next:(d)=>{
        this.itemService.message$.next('SignUp Success, Please Login')
        //the redirect is not made yet, make it James
        this.router.navigateByUrl('');
      }
    })
  }
}
