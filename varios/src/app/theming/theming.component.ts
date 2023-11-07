import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
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
export class ThemingComponent implements OnInit {
  private document = inject(DOCUMENT);
  private render = inject(Renderer2);

  ngOnInit() {
    this.render.removeClass(this.document.body, 'dark-theme');
    this.render.addClass(this.document.body, 'light-theme');
  }

  setTheme({ value }: MatSelectChange) {
    if (value === 'light') {
      this.render.removeClass(this.document.body, 'dark-theme');
      this.render.addClass(this.document.body, 'light-theme');
    } else {
      this.render.removeClass(this.document.body, 'light-theme');
      this.render.addClass(this.document.body, 'dark-theme');
    }
  }
}
