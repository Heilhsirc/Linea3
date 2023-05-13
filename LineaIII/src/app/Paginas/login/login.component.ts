import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginService } from 'src/app/_servicios/login.service'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm:FormGroup;
  //public rol;
  constructor(private formBuilder: FormBuilder, 
    private route: Router, private loginSvc:LoginService) {
    this.loginForm = formBuilder.group({
      usuario : ['',[
        Validators.required,
      ]],
      contrasena : ['',[
        Validators.required,
        Validators.minLength(4),
        
      ]],
    });
   }

  ngOnInit(): void {
    
  }


  send(){
    this.loginSvc.login(((document.getElementById("usuario") as HTMLInputElement).value),
    ((document.getElementById("contrasena") as HTMLInputElement).value)).subscribe(data =>{
      if(data != null){
        this.loginSvc.Auth(data.username as string ,data.password as string).subscribe(data =>{
          sessionStorage.setItem('Token',data[0].token as string);
          sessionStorage.setItem('Rol',data[0].rolid);
          this.route.navigate(['/Alumnos']);
        });
      }else{
        alert("Usuario o contrasena incorrecta");
      }
    });
  }
}
