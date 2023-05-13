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








@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlumnosComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
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