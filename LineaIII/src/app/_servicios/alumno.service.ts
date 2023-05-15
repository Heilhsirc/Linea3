import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from '../Modelos/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private url: string = 'https://3.131.252.96:8081/api/Alumnos/Listar';

  constructor(private http: HttpClient) { }

  public listar(){
    return this.http.get<Alumno[]>(`${this.url}`,{
        headers: new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8').
        set('Authorization', 'Bearer  ' + (sessionStorage.getItem('Token')))
    });
}
}
