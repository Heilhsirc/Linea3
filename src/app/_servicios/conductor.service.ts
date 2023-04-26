import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Conductor } from '../_Modelos/Conductor';



@Injectable({
  providedIn: 'root'
})
export class ConductorService {
  private url: string = `${environment.HOST}/usuarios`;


  constructor(private http: HttpClient) { }

  listar(x1,x2){
    return this.http.get<any>(`${this.url}/pageablePorRol/4/${x1}/${x2}`);
  }

  public guardar(conductor: Conductor){
    return this.http.post(`${this.url}/guardar`, conductor);
}

public editar (conductor: Conductor){
  return this.http.put(`${this.url}/editar`, conductor);
}

public obtenerConductor(id:number){
  return this.http.get<Conductor>(`${this.url}/listar/${id}`);
}

public listarAsociados(x1:number){
  return this.http.get<any>(`${this.url}/listarConductorVehiculo/${x1}`);
}

public eliminarConductor(id:number){
  return this.http.delete(`${this.url}/eliminar/${id}`);
}

public listarNoAsociados(x1:number){
  return this.http.get<any>(`${this.url}/listarConductorNoVehiculo/${x1}`);
}
}
