import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Paginas/login/login.component';
import { AlumnosComponent } from './Paginas/alumnos/alumnos.component';
import { GuardianService } from 'src/app/_share/guardian.service';
import { NoauthComponent } from './Paginas/noauth/noauth.component';
import { CursosComponent } from './Paginas/cursos/cursos.component';
import { AgregarComponent } from './Paginas/cursos/agregar/agregar.component';
import { EditarCursoComponent } from './Paginas/cursos/editar-curso/editar-curso.component';
import { RecuperarComponent } from './Paginas/recuperar/recuperar.component';
import { FichaUsuarioComponent } from './Paginas/alumnos/ficha-usuario/ficha-usuario.component';
import { FichaCursoComponent } from './Paginas/cursos/editar-curso/ficha-curso/ficha-curso.component';



const routes: Routes = [
  {path :'', component: LoginComponent},
  {path: 'Alumnos', component:AlumnosComponent, children: [
    {path: 'FichaUsuario/:id', component: FichaUsuarioComponent, children: [
      {path: 'FichaCurso/:id', component: FichaCursoComponent, canActivate: [GuardianService]}
    ]}
  ],canActivate: [GuardianService]},
  {path: 'unauth', component: NoauthComponent},
  {path :'Login', component: LoginComponent},
  {path: 'Cursos', component:CursosComponent, children:[
    {path: 'EditarCurso/:id', component: EditarCursoComponent, canActivate: [GuardianService]},
    {path: 'FichaCurso/:id', component: FichaCursoComponent,canActivate: [GuardianService]}
  ], canActivate: [GuardianService]},
  {path: 'AgregarCurso', component: AgregarComponent, canActivate: [GuardianService]},
  {path: 'Recuperar', component: RecuperarComponent}
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
