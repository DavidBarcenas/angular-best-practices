import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'Estilos en aplicaciones Angular';
  subTitle = 'Para aplicaciones modernas';
  pills = [{ label: 'HTML' }, { label: 'CSS' }, { label: 'SASS' }];
}
