import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomSelectComponent, SelectValue } from '../custom-select/custom-select.component';
import { SelectOptionComponent } from '../select-option/select-option.component';

@Component({
  selector: 'app-custom-select-page',
  standalone: true,
  imports: [CommonModule, CustomSelectComponent, SelectOptionComponent],
  templateUrl: './custom-select-page.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSelectPageComponent {
  selectedValue = 'hydrogen';

  onSelectionChange(value: SelectValue<string>) {
    console.log(value);
  }
}
