import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../Modelos/usuario';
import { Security } from '../Modelos/security';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = 'https://localhost:7033/api/Login/Login';
  private url2: String = 'https://localhost:7033/api/Authentication/Auth'

  constructor(private http: HttpClient) { }

  public login(usuario: string, password: string){
    const body = `{
      "username": "${usuario}",
      "password": "${password}",
      "nombre": "",
      "email": ""}`;
    return this.http.post<Usuario>(`${this.url}`, body, {
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
}
