import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth.routing';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { SignupComponent } from './signup/signup.component';
import { EmailConfirmComponent } from './email-confirm/email-confirm.component';

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    VerifyCodeComponent,
    SignupComponent,
    EmailConfirmComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
