import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/Modelos/usuario';
import { LoginService } from 'src/app/_servicios/login.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent {

  public recuperarForm:FormGroup;
  constructor(private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private loginSvc: LoginService){
    this.recuperarForm = formBuilder.group({
      email : ['',[
        Validators.pattern('[a-zA-Z0-9!#$%&\'*\/=?^_`{|}~+-]([\.]?[a-zA-Z0-9!#$%&\'*\/=?^_`{|}~+-])+@[a-zA-Z0-9]([^@&%$/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?'),
        Validators.required
      ]]
    });
  }

  send(){
    this.loginSvc.recuperar().subscribe(data =>{
      sessionStorage.setItem('Rtok',data)
    });
    this.loginSvc.buscar(((document.getElementById("email") as HTMLInputElement).value)).subscribe(data =>{
      if(data != null){
        this.loginSvc.enviar(data.celular as string, `Su usuario es: ${data.username} y su contrasenia es : ${data.password}` as string).subscribe(data =>{
        });
      }
    });
  }
}
