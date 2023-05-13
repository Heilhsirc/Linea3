import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Paginas/login/login.component';
import { AlumnosComponent } from './Paginas/alumnos/alumnos.component';


const routes: Routes = [
  {path :'', component: LoginComponent},
  {path :'Alumnos', component: AlumnosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
