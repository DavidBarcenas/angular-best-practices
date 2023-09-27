import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { BannerComponent } from './banner/banner.component';

@Component({
  selector: 'app-theming',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    BannerComponent,
  ],
  templateUrl: './theming.component.html',
  styleUrls: ['./theming.component.scss'],
})
export class ThemingComponent {}
