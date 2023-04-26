import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { InterceptorService } from './interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = `${environment.HOST}/oauth/token`;

  constructor(private http: HttpClient, private router: Router,
              private interceptorSvc: InterceptorService) { }

  public login(usuario: string, password: string){
        const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(password)}`;
        return this.http.post<any>(`${this.url}`, body, {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').
            set('Authorization', 'Basic ' + btoa(`${environment.TOKEN_AUTH_USERNAME}:${environment.TOKEN_AUTH_PASSWORD}`))
        });
  }

  public cerrarSesion(){
    const tk = sessionStorage.getItem(environment.TOKEN);
    this.http.get(`${environment.HOST}/cerrarSesion/anular/${tk}`).subscribe(data =>{
          sessionStorage.clear();
          this.interceptorSvc.logeed.next(false);
          this.interceptorSvc.rol.next(null);
          this.router.navigate(['/Login']);
    });
}

public estaLogueado(): boolean{
  const tk = sessionStorage.getItem(environment.TOKEN);
  return !!tk;
}

}
