import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-utilities';
  pills = [
    {
      label: 'HTML',
    },
    {
      label: 'CSS',
    },
    {
      label: 'SASS',
    },
  ];
}
