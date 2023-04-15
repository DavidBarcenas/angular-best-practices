import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { HomeBackgroundComponent } from './components/home-background/home-background.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AuthComponent,
    HomeBackgroundComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ForgotPasswordComponent
  ],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, FontAwesomeModule, SharedModule]
})
export class AuthModule {}
