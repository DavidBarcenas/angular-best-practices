import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SeriesComponent } from './animations/series/series.component';
import { ThemingComponent } from './theming/theming.component';
import { DashboardComponent } from './testing/components/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SeriesComponent, ThemingComponent, DashboardComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
