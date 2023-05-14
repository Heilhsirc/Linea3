import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from '../Modelos/curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private url: string = 'https://localhost:7033/api/Cursos/';

  constructor(private http: HttpClient) { }

  public listar(){
    return this.http.get<Curso[]>(`${this.url}Listar`,{
        headers: new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8').
        set('Authorization', 'Bearer  ' + (sessionStorage.getItem('Token')))
    });
 }
  public guardar(curso: Curso){
    const body = `{
      "nombre": "${curso.codigo}",
      "codigo": "${curso.nombre}",
      "creditos": "${curso.creditos}"
      }`;
    return this.http.put<any>(`${this.url}Agregar`, body, {
        headers: new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8').
        set('Authorization', 'Bearer  ' + (sessionStorage.getItem('Token')))
    });
  }
}
