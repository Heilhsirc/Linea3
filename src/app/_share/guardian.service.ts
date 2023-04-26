import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginService } from 'src/app/_servicios/login.service';


@Injectable({
  providedIn: 'root'
})
export class GuardianService implements CanActivate {

  constructor(private loginService: LoginService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      
      if(this.loginService.estaLogueado() == true) {

          const helper = new JwtHelperService();
          let token = sessionStorage.getItem(environment.TOKEN);

          if(!helper.isTokenExpired(token)){

            const decodedToken = helper.decodeToken(token);
            const rol: string = decodedToken.authorities[0];
            const url: string = state.url;
            
            if(url.includes('Vehiculos') && rol == 'Administrador')
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
            this.loginService.cerrarSesion();
            return false;
          }
      } else {
          this.router.navigate(['/unauth']);
          return false;
      }

  }
}
