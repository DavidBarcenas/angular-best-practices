import { Component } from '@angular/core';

@Component({
  selector: 'app-styling-components',
  templateUrl: './styling-components.component.html',
  styleUrls: ['./styling-components.component.scss'],
})
export class StylingComponentsComponent {
  pills = [{ label: 'HTML' }, { label: 'CSS' }, { label: 'SASS' }];
}
