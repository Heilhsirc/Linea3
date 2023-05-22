import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginService } from 'src/app/_servicios/login.service';
import { environment } from '../environments/environment';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class GuardianService {

  constructor(private loginService: LoginService,
    private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if(this.loginService.estaLogueado() == true) {

        if(sessionStorage.getItem('Token')){

          const rol = CryptoJS.AES.decrypt(sessionStorage.getItem('Roli')!.trim(),environment.CLAVE.trim()).toString(CryptoJS.enc.Utf8)
          const url: string = state.url;
          
          if(url.includes('Alumnos') && rol == 'Administrador')
            return true;
          else if(url.includes('Cursos') && rol == 'Administrador')
            return true;
          else if(url.includes('Cursos') && rol == 'Estudiante')
            return true;
          else if(url.includes('AgregarCurso') && rol == 'Administrador')
            return true;
          else if(url.includes('EditarCurso') && rol == 'Administrador')
            return true;  
          else if(url.includes('FichaCurso') && rol == 'Administrador')
            return true;
          else if(url.includes('FichaUsuario') && rol == 'Administrador')
            return true;
          else if(url.includes('FichaUsuario') && rol == 'Estudiante')
            return true;
          else if (url.includes('Registrar-Alumno') && rol == 'Administrador' )
             return true;                                      
          else {
            this.router.navigate(['/unauth']);
            return false;
          }

        } else {
          this.loginService.close();
          return false;
        }
    } else {
        this.router.navigate(['/unauth']);
        return false;
    }
    }
}
