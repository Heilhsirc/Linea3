import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = 'https://localhost:7033/api/Login/Login';

  constructor(private http: HttpClient) { }

  public login(usuario: string, password: string){
    const body = `grant_type=password&username&nombre&email=${encodeURIComponent(usuario)}&password=${encodeURIComponent(password)}&nombre=${''}&email=${''}`;
    return this.http.post<any>(`${this.url}`, body, {
        headers: new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8') 
    });
}
}
