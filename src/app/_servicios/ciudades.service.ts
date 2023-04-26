import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{environment} from '../../environments/environment';
import { ciudades } from '../_Modelos/Ciudades';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {
  private url: string = `${environment.HOST}/departa`;
  // url= http://192.168.12.34/moviit-back/departamentos/listar
  constructor(private http:HttpClient) { 
  }

  listar_ciudades( idDep:number){
    return this.http.get<ciudades[]>(`${this.url}mentos/ciudad/listarPorDepartamnto/${idDep}`);
  }
}
