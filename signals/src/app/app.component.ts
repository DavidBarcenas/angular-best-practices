import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SeriesComponent } from './animations/series/series.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SeriesComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
