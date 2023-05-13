import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService {

  constructor(private snackBar: MatSnackBar,
              private router: Router) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(req).pipe(retry(2)).
    pipe(tap(event => {
      if (event instanceof HttpResponse) {
        if (event.body && event.body.error === true && event.body.errorMessage) {
          throw new Error(event.body.errorMessage);
        }/*else{
            this.snackBar.open("EXITO", 'AVISO', { duration: 5000 });    
        }*/
      }
    })).pipe(catchError((err) => {
          console.log(err);
          if(err.error.message == "400 BAD_REQUEST"){
            this.openSnackBar("---Relación conductor y vehículo ya está registrada");
          }else if(err.status == 400 && err.error.error == "invalid_grant") { 
                this.openSnackBar("Usuario o Contraseña invalidos");
          }else if(err.status == 400) { 
            this.openSnackBar("Usuario o contrasenia incorrecta");
          }else if(err.error.status == 404) {
                this.openSnackBar(err.error.message);
          } else if(err.error.status == 405) {
                this.openSnackBar(err.error.message);
                this.router.navigate(['/error']);
          } else if(err.error.status == 415) {
                this.openSnackBar(err.error.message);
                this.router.navigate(['/error']);
          } else  if(err.error.status == 500) {
                this.router.navigate(['/error']);
          }
          return EMPTY;
    }));
    
  }

  private openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Información', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
