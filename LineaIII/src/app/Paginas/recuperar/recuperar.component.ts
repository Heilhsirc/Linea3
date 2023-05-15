import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
        Validators.pattern('[a-zA-Z0-9!#$%&\'*\/=?^_`{|}~+-]([\.]?[a-zA-Z0-9!#$%&\'*\/=?^_`{|}~+-])+@[a-zA-Z0-9]([^@&%$/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?')
        ,Validators.required
      ]]
    });
  }

  send(){
    this.loginSvc.recuperar((document.getElementById("usuario") as HTMLInputElement).value).subscribe(data =>{});
  }
}
