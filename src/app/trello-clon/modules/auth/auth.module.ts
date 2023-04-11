import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { HomeBackgroundComponent } from './components/home-background/home-background.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AuthComponent,
    HomeBackgroundComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [CommonModule, AuthRoutingModule]
})
export class AuthModule {}
