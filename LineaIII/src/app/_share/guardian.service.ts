import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginService } from 'src/app/_servicios/login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardianService {

  constructor(private loginService: LoginService,
    private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if(this.loginService.estaLogueado() == true) {

        if(sessionStorage.getItem('Token')){

          const rol = sessionStorage.getItem('Rol');
          const url: string = state.url;
          
          if(url.includes('Alumnos') && rol == '1')
            return true;
          else if(url.includes('Cursos') && rol == '1')
            return true;
          else if(url.includes('AgregarCurso') && rol == '1')
            return true;
          else if(url.includes('EditarCurso') && rol == '1')
            return true;  
          else if(url.includes('FichaCurso') && rol == '1')
            return true;
          else if(url.includes('FichaUsuario') && rol == '1')
            return true;
          else if (url.includes('Registrar-Alumno') && rol == '1')
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
