import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {

  constructor(private http:HttpClient) { }
  fetchFactures(): Observable<any>  {
  return this.http.get('http://localhost:8081/api/factures')
}
}
