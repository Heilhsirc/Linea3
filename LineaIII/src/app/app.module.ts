import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Paginas/login/login.component';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AlumnosComponent } from './Paginas/alumnos/alumnos.component';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BnNgIdleService } from 'bn-ng-idle';
import { ErrorInterceptorService } from 'src/app/_share/error-interceptor.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoauthComponent } from './Paginas/noauth/noauth.component';
import { MatInputModule } from '@angular/material/input';
import { CursosComponent } from './Paginas/cursos/cursos.component';
import { RecuperarComponent } from './Paginas/recuperar/recuperar.component';
import { AgregarComponent } from './Paginas/cursos/agregar/agregar.component';
import { MatButtonModule } from '@angular/material/button';
import { EditarCursoComponent } from './Paginas/cursos/editar-curso/editar-curso.component';
import { FichaUsuarioComponent } from './Paginas/alumnos/ficha-usuario/ficha-usuario.component';
import { FichaCursoComponent } from './Paginas/cursos/editar-curso/ficha-curso/ficha-curso.component';










@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlumnosComponent,
    NoauthComponent,
    CursosComponent,
    RecuperarComponent,
    AgregarComponent,
    EditarCursoComponent,
    FichaUsuarioComponent,
    FichaCursoComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatProgressBarModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    HttpClientModule,
    ErrorTailorModule.forRoot({
      errors: {
        useValue: {
          required: 'Este campo es requerido',
          minlength: ({ requiredLength, actualLength }) => 
                      `Expect ${requiredLength} but got ${actualLength}`,
          invalidAddress: error => `Address isn't valid`
        }
      }
    }),
    BrowserAnimationsModule,
    MatTableModule,
  ],
  providers: [
    BnNgIdleService,
    {provide:HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
