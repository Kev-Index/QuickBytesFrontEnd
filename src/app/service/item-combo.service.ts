import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../model/item.model';
import { ItemCombo } from '../model/itemCombo.model';

@Injectable({
  providedIn: 'root'
})
export class ItemComboService {
  postItemComboApi: string;

  constructor(private http: HttpClient) { 
    this.postItemComboApi='http://localhost:8489/itemcombo/';
  }

  postCombo(comboId: number, itemId: number): Observable<ItemCombo> {
    return this.http.post<ItemCombo>(this.postItemComboApi+ itemId+ "/"+comboId, {});
    console.log("hey");
  }
}
