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
          if(err.error.message == "Usuario o contrasenia incorrecta"){
            this.openSnackBar(err.error.message);
          }else if(err.error.message == "Alumno no existe") {
                this.openSnackBar(err.error.message);
          } else if(err.error.message == "Error al agregar, el nif ya esta registrado") {
                this.openSnackBar(err.error.message);
          } else if(err.error.message == "Error al agregar, username ya esta en uso") {
                this.openSnackBar(err.error.message);
          } else  if(err.error.message == "Usuario no existe") {
                this.openSnackBar(err.error.message);
          }else if (err.error.message == "Curso no existe"){
                this.openSnackBar(err.error.message);
          }else if (err.error.message == "Error al agregar el curso, el codigo del curso ya esta registrado"){
            this.openSnackBar(err.error.message);
          }else if(err.error.message=="Error al eliminar el curso"){
            this.openSnackBar(err.error.message);
          }
          return EMPTY;
    }));
    
  }

  private openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Información', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
