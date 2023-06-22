import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template-forms-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './template-forms-page.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateFormsPageComponent {}
