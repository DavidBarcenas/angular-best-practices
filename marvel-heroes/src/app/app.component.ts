import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeroGridComponent } from './components/hero-grid/hero-grid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeroGridComponent],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {}
