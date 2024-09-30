import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Provider } from '../Models/Provider';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient) { }

  Add(supplier: Provider){
    return this.http.post<Provider>("http://localhost:8081/api/providers", supplier);
  }

  GetAll(){
    return this.http.get<Provider[]>("http://localhost:8081/api/providers");
  }
  update(prov : Provider){
    return this.http.put<Provider>('http://localhost:8081/api/providers/'+prov.id,prov);
  }
}
