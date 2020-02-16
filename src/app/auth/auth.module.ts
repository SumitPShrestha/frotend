import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthTokenInterceptor } from './intercetor.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LogoComponent } from '../core/components/logo/logo.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LogoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
  ],
})
export class AuthModule { }
