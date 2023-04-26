import { Injectable } from '@angular/core';
import{HttpClient, HttpClientModule} from '@angular/common/http';
import{environment} from '../../environments/environment';
import{Departamentos} from '../_Modelos/Departamentos';

@Injectable({
  providedIn: 'root'
})

export class DepartamentosService {
  private url: string = `${environment.HOST}/departa`;
  // url= http://192.168.12.34/moviit-back/departamentos/listar
  constructor(private http:HttpClient) { 
  }
  listar_departamentos( ){
    return this.http.get<Departamentos[]>(`${this.url}mentos/listar`);
  }

}
