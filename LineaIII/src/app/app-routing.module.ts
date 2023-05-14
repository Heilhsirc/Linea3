import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Paginas/login/login.component';
import { AlumnosComponent } from './Paginas/alumnos/alumnos.component';
import { GuardianService } from 'src/app/_share/guardian.service';
import { NoauthComponent } from './Paginas/noauth/noauth.component';
import { CursosComponent } from './Paginas/cursos/cursos.component';
import { AgregarComponent } from './Paginas/cursos/agregar/agregar.component';



const routes: Routes = [
  {path :'', component: LoginComponent},
  {path: 'Alumnos', component:AlumnosComponent, canActivate: [GuardianService]},
  {path: 'unauth', component: NoauthComponent},
  {path :'Login', component: LoginComponent},
  {path: 'Cursos', component:CursosComponent, canActivate: [GuardianService]},
  {path: 'AgregarCurso', component: AgregarComponent, canActivate: [GuardianService]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
