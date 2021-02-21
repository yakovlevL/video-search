import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuthLayoutComponent} from './auth-layout/auth-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {NzLayoutModule} from 'ng-zorro-antd/layout';



@NgModule({
  declarations: [
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AuthLayoutComponent, children: [
          {path: '', redirectTo: '/auth/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'register', component: RegisterPageComponent}
        ]
      }
    ]),
    NzLayoutModule
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
