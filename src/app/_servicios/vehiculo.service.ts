import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Vehiculo } from '../_Modelos/Vehiculo';
import { VehiculosPaginados } from '../_Modelos/VehiculosPaginado';
import { Observable, pipe, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InterceptorService } from './interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private url: string = `${environment.HOST}/vehiculos`;
  public refresh = new Subject<boolean>();

  constructor(private http: HttpClient, private interceptorSvc: InterceptorService) { }

  listarObservable():Observable<VehiculosPaginados>{
    return this.http.get<VehiculosPaginados>(`${this.url}/pageable?page=0&size=5`);
  }


  editarObservable(vehiculo : Vehiculo):Observable<Vehiculo>{
    return this.http.put<Vehiculo>(`${this.url}/editar`, vehiculo);
  }

  public editar (vehiculo : Vehiculo){
    return this.http.put(`${this.url}/editar`, vehiculo);
  }

  public guardar(vehiculo: Vehiculo){
      return this.http.post(`${this.url}/guardar`, vehiculo);
  }

  public listar(){
    return this.http.get<VehiculosPaginados>(`${this.url}/pageable?page=0&size=5`);
  }

  public listarId(x1:number){
    return this.http.get<Vehiculo>(`${this.url}/listar/${x1}`);
  }

  public listarPage(x1,x2){
    return this.http.get<VehiculosPaginados>(`${this.url}/pageable?page=${x1}&size=${x2}`);
  }

  asociarVehiculo(x1,x2){
    return this.http.post(`${this.url}/asociarcondcutor/${x1}/${x2}`,null);
  }

  public desasociar(id:number,idvehi:number){
    return this.http.post(`${this.url}/desasociarconductor/${id}/${idvehi}`,null);
  }
}
