import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginService } from 'src/app/_servicios/login.service'
import { environment } from 'src/environments/environment';
import { InterceptorService } from 'src/app/_servicios/interceptor.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm:FormGroup;
  public rol;
  constructor(private formBuilder: FormBuilder, 
    private route: Router, private loginSvc:LoginService,
    private interceptorSvc : InterceptorService ) {
    this.loginForm = formBuilder.group({
      usuario : ['',[
        Validators.required,
      ]],
      contrasena : ['',[
        Validators.required,
        Validators.minLength(6),
        
      ]],
    });
   }

  ngOnInit(): void {
    if(this.loginSvc.estaLogueado()){
      this.route.navigate(['/Vehiculos']);
    }
  }


  send(){
    this.loginSvc.login(((document.getElementById("usuario") as HTMLInputElement).value),
    ((document.getElementById("contrasena") as HTMLInputElement).value)).subscribe(data =>{
      sessionStorage.setItem(environment.TOKEN, data.access_token);
      const helper = new JwtHelperService();
      let token = sessionStorage.getItem(environment.TOKEN);
      const decodedToken = helper.decodeToken(token);
      this.rol = decodedToken.authorities[0];
      if(this.rol == "Administrador"){
      this.route.navigate(['/Vehiculos']);
    }else{
      this.route.navigate(['/Pedidos']);
    }
    this.interceptorSvc.toolBarReactiva.next(false);
    this.interceptorSvc.logeed.next(true);
    this.interceptorSvc.rol.next(this.rol);
    //console.log(data);
  });
  }
}
