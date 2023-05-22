import { Component } from '@angular/core';
import { LoginService } from './_servicios/login.service';
import { Router } from '@angular/router';
import { InterceptorService } from './_servicios/interceptor.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { loaderService } from './_servicios/loader.service';
import { environment } from './environments/environment';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LineaIII';
  idleState = 'Not started.';
  timedOut = false;

  public rol : string | undefined;
  public logeado : Boolean = false;
  public flagProgresBar: Boolean = true;
  public flagToolbar:    boolean = true;

  constructor(public loader: loaderService,
    private loginSvc: LoginService, public router : Router,
    private interceptorSvc: InterceptorService,
    private bnIdle: BnNgIdleService){

  }

  ngOnInit(){
    if(this.logeado){
      this.logeado=this.loginSvc.estaLogueado();
      this.rol = CryptoJS.AES.decrypt(sessionStorage.getItem('Roli')!,environment.CLAVE).toString(CryptoJS.enc.Utf8);
      }
      
    this.bnIdle.startWatching(20).subscribe((isTimedOut: Boolean)=>{
      if(isTimedOut){
        if(this.loginSvc.estaLogueado()){
          this.close();
        }
      }
    });

    this.loader.progresBarReactive.subscribe(data =>{
      this.flagProgresBar = data;
    });

    this.interceptorSvc.logeed.subscribe(data => {
      this.logeado = data;
    });

    this.interceptorSvc.progresBarReactive.subscribe(data =>{
        this.flagProgresBar = data;  
    });

    this.interceptorSvc.rol.subscribe(data => {
      this.rol = data;
    });
    
  }

  close(){
    this.loginSvc.close();
      sessionStorage.clear();
      this.interceptorSvc.logeed.next(false);
      this.router.navigate(['/Login']);
  }
}
