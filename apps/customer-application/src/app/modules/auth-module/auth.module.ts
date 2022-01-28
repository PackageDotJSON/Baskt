import { ReactiveFormsModule } from '@angular/forms';
//importing built-in modules

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//importing socket module

import { SocketModule } from '@baskt-mono-repo/socket';

//importing NgPrime modules

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';

//importing routes

import { ROUTES } from './routes/routes.constants';

//importing components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

//importing services
import { RegisterService } from './service/register.service';
import { LoginService } from './service/login.service';
import { MessageService } from 'primeng/api';
import { AuthService } from './service/auth.service';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule,

    CardModule,
    InputTextModule,
    ButtonModule,
    InputMaskModule,
    InputNumberModule,
    RippleModule,
    ToastModule,

    SocketModule,
  ],
  providers: [
    RegisterService,
    LoginService,
    MessageService,
    AuthService
  ],
})
export class AuthModule {}
