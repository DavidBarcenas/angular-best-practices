import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styles: [],
  imports: [RouterModule, HeaderComponent, FooterComponent],
})
export class AppComponent {
  title = inject(Title);
  copyrightYear = new Date().getFullYear();
}
