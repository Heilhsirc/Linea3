import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Paginas/login/login.component';
import { AlumnosComponent } from './Paginas/alumnos/alumnos.component';
import { GuardianService } from 'src/app/_share/guardian.service';



const routes: Routes = [
  {path :'', component: LoginComponent},
  {path: 'Alumnos', component:AlumnosComponent, canActivate: [GuardianService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
