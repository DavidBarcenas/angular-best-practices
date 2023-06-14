import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AgeCalculatorComponent } from './age-calculator/age-calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AgeCalculatorComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
