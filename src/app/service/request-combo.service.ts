import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestCombo } from '../model/requestCombo.model';

@Injectable({
  providedIn: 'root'
})
export class RequestComboService {

  getRequestCombosByRequestIdApi:string;

  constructor(private http:HttpClient) { 
    this.getRequestCombosByRequestIdApi = environment.serverUrl + '/requestcombo/rid';
  }

  fetchRequestCombosByRequestId(requestId: number):Observable<RequestCombo[]> {
    return this.http.get<RequestCombo[]>(this.fetchRequestCombosByRequestId+"/"+requestId);
  }
}
