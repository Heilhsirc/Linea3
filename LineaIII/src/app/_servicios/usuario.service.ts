import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Usuario } from '../Modelos/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = `${environment.HOST}/Usuario`;

  constructor(private http: HttpClient) { }

  public guardar(user: Usuario){
    const body = ` {
      "username": "${user.username}",
      "password": "${user.password}",
      "nombre": "${user.nombre}",
      "email": "${user.email}",
      "celular": "${user.celular}",
      "rolid": "${2}"
  }`;
    return this.http.put<any>(`${this.url}/Agregar`, body, {
        headers: new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8').
        set('Authorization', 'Bearer  ' + (sessionStorage.getItem('Token')))
    });
  }
}
