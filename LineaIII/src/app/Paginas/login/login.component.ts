import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginService } from 'src/app/_servicios/login.service'
import { InterceptorService } from 'src/app/_servicios/interceptor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/app/environments/environment';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm:FormGroup;
  public rol: string | undefined;
  constructor(private formBuilder: FormBuilder, 
    private route: Router, private loginSvc:LoginService,
    private interceptorSvc: InterceptorService,
    private snackBar: MatSnackBar) {
    this.loginForm = formBuilder.group({
      usuario : ['',[
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(5),
        Validators.pattern('^(?=.{4,20}$)(?:[a-zA-Z\d]+(?:(?:\.|-|_)[a-zA-Z\d])*)+$'),
      ]],
      contrasena : ['',[
        Validators.required,
        Validators.minLength(4),
        
      ]],
    });
   }

  ngOnInit(): void {
    if(this.loginSvc.estaLogueado()){
      this.route.navigate(['/Alumnos']);
    }
  }


  send(){
    this.loginSvc.login(((document.getElementById("usuario") as HTMLInputElement).value),
    ((document.getElementById("contrasena") as HTMLInputElement).value)).subscribe(data =>{
      if(data != null){
        this.loginSvc.Auth(data.username as string ,data.password as string).subscribe(data =>{
          sessionStorage.setItem('Token',data[0].token as string);
          sessionStorage.setItem('Id',data[0].id);
          sessionStorage.setItem('Roli',CryptoJS.AES.encrypt(data[0].role.trim(), environment.CLAVE.trim()).toString());
          this.rol = CryptoJS.AES.decrypt(sessionStorage.getItem('Roli')!,environment.CLAVE).toString(CryptoJS.enc.Utf8).toString();
          this.interceptorSvc.logeed.next(true);
          this.interceptorSvc.toolBarReactiva.next(false);
          this.interceptorSvc.rol.next(this.rol as string);
          this.route.navigate(['/Alumnos']);
        });
      }else{
       this.openSnackBar("Usuario o contrasenia incorrecto");
      }
    });
  }

  private openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Información', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
