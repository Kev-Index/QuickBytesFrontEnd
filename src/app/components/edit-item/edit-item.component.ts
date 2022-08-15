import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserInfo, UserSecurityDto } from 'src/app/auth/model/user.model';
import { AuthService } from 'src/app/auth/service/auth.service';
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
  item$:BehaviorSubject<Item>;
  editItemForm:FormGroup; 
  user: UserSecurityDto;
  constructor(private actRoute:ActivatedRoute, private router:Router,private itemService:ItemService, private authService:AuthService) {
  }

  ngOnInit(): void {
    this.itemId = this.actRoute.snapshot.paramMap.get('itemId');
    this.authService.getUserSecurityDetailsByUsername(localStorage.getItem("username")).subscribe(data=>{
      this.user=data;
    });

    
    this.editItemForm = new FormGroup({
        name: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z ]+$/)]),
        price: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*\.[0-9]{2}$/)]),
        quantity: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      });

      this.itemService.getItem(this.itemId).subscribe(data=>{
        this.itemDto = data;
        
        this.editItemForm.controls['name'].setValue(this.itemDto.name);
        this.editItemForm.controls['price'].setValue(this.itemDto.price);
        this.editItemForm.controls['quantity'].setValue(this.itemDto.quantity);
      });
  }

  onFormSubmit(){
    this.itemDto={
      name: this.editItemForm.value.name,
      price:this.editItemForm.value.price,
      quantity:this.editItemForm.value.quantity,
    };

    this.itemService.editItem(this.itemDto).subscribe({
      next:(d)=>{
        this.itemService.message$.next('SignUp Success, Please Login')
        //the redirect is not made yet, make it James
        this.router.navigateByUrl('/items/'+this.user.id);
      }
    })
  }

}
