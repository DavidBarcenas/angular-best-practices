import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { HomeBackgroundComponent } from '../../components/home-background/home-background.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: true,
  imports: [HomeBackgroundComponent, HeaderComponent, RouterOutlet, FooterComponent]
})
export class AuthComponent {}
