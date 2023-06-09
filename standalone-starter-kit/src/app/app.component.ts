import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

interface Technology {
  name: string;
  url: string;
  image: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  techList: Technology[] = [
    {
      name: 'Angular 16',
      url: 'https://angular.io/',
      image: 'assets/icons/angular-icon.svg'
    },
    {
      name: 'Conventional commits',
      url: 'https://www.conventionalcommits.org/en/v1.0.0/',
      image: 'assets/icons/commits-icon.png'
    },
    {
      name: 'ESlint',
      url: 'https://eslint.org/',
      image: 'assets/icons/eslint-icon.svg'
    },
    {
      name: 'Husky',
      url: 'https://typicode.github.io/husky/',
      image: 'assets/icons/husky-icon.png'
    },
    {
      name: 'pNpm',
      url: 'https://pnpm.io/es/',
      image: 'assets/icons/pnpm-icon.svg'
    },
    {
      name: 'Prettier',
      url: 'https://prettier.io/',
      image: 'assets/icons/prettier-icon.svg'
    },
    {
      name: 'Sass',
      url: 'https://sass-lang.com/',
      image: 'assets/icons/sass-icon.svg'
    },
    {
      name: 'Tailwindcss',
      url: 'https://tailwindcss.com/',
      image: 'assets/icons/tailwindcss-icon.svg'
    },
  ]
}
