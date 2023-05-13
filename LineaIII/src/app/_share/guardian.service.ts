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

        if(sessionStorage.getItem('online')){

          const rol = sessionStorage.getItem('Rol');
          const url: string = state.url;
          
          if(url.includes('Alumnos') && rol == 'Administrador')
            return true;
          else if(url.includes('Registrar') && rol == 'Administrador')
            return true;
          else if(url.includes('Departamentos') && rol == 'Administrador')
            return true;
          else if(url.includes('Ciudades') && rol == 'Administrador')
            return true;  
          else if(url.includes('Conductores') && rol == 'Administrador')
            return true;
          else if(url.includes('Pedidos') && rol == 'Conductor')
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
