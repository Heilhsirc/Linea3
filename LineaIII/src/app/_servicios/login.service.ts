import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../Modelos/usuario';
import { Security } from '../Modelos/security';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = `${environment.HOST}/Login/`;
  private url2: String = `${environment.HOST}/Authentication/Auth`

  constructor(private http: HttpClient) { }

  public login(usuario: string, password: string){
    const body = `{
      "username": "${usuario}",
      "password": "${password}",
      "nombre": "",
      "email": "",
      "celular": ""}`;
    return this.http.post<Usuario>(`${this.url}Login`, body, {
        headers: new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8') 
    });
}

  public Auth(usuario: string, password: string){
    const body = `{
      "user": "${usuario}",
      "tranKey": "${password}"
    }`;
    return this.http.post<any>(`${this.url2}`, body, {
        headers: new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8') 
    });
  }

  public close(){
    const body = `{
      "id": ${sessionStorage.getItem('Id')},
      "username": "",
      "password": "",
      "nombre": "",
      "email": ""},
      "celular": ""}`;
    return this.http.post<any>(`${this.url}Close`, body, {
        headers: new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8') 
    });
  }

  public estaLogueado(): boolean{
    const tk = sessionStorage.getItem('Token');
    return !!tk;
  }

  public recuperar(email: string) {
    const body = `{
      "Correo": "${email}"}`;
    return this.http.post<any>(`${this.url}Recuperar`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8')
    });
  }
}
