import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from '../Modelos/alumno';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private url: string = `${environment.HOST}/Alumnos`;

  constructor(private http: HttpClient) { }

  public listar(){
    return this.http.get<Alumno[]>(`${this.url}/listar`,{
        headers: new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8').
        set('Authorization', 'Bearer  ' + (sessionStorage.getItem('Token')))
    });
}

  public buscar(id: number){
    return this.http.get<Alumno>(`${this.url}/buscar/${id}`,{
      headers: new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8').
      set('Authorization', 'Bearer  ' + (sessionStorage.getItem('Token')))
  });
  }
}
