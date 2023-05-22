import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from '../Modelos/curso';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private url: string = `${environment.HOST}/Cursos/`;

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

  public eliminar(id:number){
    return this.http.delete<any>(`${this.url}Eliminar/${id}`,{
        headers: new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8').
        set('Authorization', 'Bearer  ' + (sessionStorage.getItem('Token')))
    });
  }

  public buscar(id: number){
    return this.http.get<Curso>(`${this.url}Buscar/${id}`,{
      headers: new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8').
      set('Authorization', 'Bearer  ' + (sessionStorage.getItem('Token')))
  });
  }

  public editar(curso: Curso, id: number){
    const body = `{
      "id":${id},
      "nombre": "${curso.codigo}",
      "codigo": "${curso.nombre}",
      "creditos": "${curso.creditos}"
      }`;
    return this.http.post<any>(`${this.url}Modificar`, body, {
        headers: new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8').
        set('Authorization', 'Bearer  ' + (sessionStorage.getItem('Token')))
    });
  }

  public listaCursos(id: number){
    return this.http.get<any>(`${this.url}BuscarXAlumno/${id}`,{
      headers: new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8').
      set('Authorization', 'Bearer  ' + (sessionStorage.getItem('Token')))
  });
  }
}
