import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../Modelos/usuario';
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
      "email": "",
      "celular": ""}`;
    return this.http.post<any>(`${this.url}Close`, body, {
        headers: new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8') 
    });
  }

  public estaLogueado(): boolean{
    const tk = sessionStorage.getItem('Token');
    return !!tk;
  }

  public recuperar() {
    const body = `form-data=clave&usuario=${environment.USER}&clave=${environment.PASS}`;
        return this.http.post<any>(`${environment.RECUPERAR}`, body, {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').
            set('Authorization', 'Bearer' + btoa(`${environment.USER}:${environment.PASS}`))
        });
  }

  public buscar(correo : string){
    const body = `{
      "username": "",
      "password": "",
      "nombre": "",
      "correo": "${correo}",
      "celular": ""
  }`;
    return this.http.post<any>(`${this.url}Recuperar`, body, {
        headers: new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8') 
    });
  }

  public enviar(celular:string,mensaje:string) {
    const body = `form-data=mensaje&numero=${celular}&mensaje=${mensaje}`;
        return this.http.post<any>(`${environment.RECUCLAVE}`, body, {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').
            set('Authorization', 'Bearer ' + (sessionStorage.getItem('Rtok')))
        });
  }
}
