import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-age-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './age-calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgeCalculatorComponent {
  dayControl = signal('');
  monthControl = signal('');
  yearControl = signal('');

  day = computed(() => this.month() * 31);
  month = computed(() => this.year() * 12);
  year = computed(() => (this.yearControl() ? new Date().getFullYear() - Number(this.yearControl()) : 0));

  onSubmit(form: NgForm) {
    const { day, month, year } = form.value;
    this.dayControl.set(day);
    this.monthControl.set(month);
    this.yearControl.set(year);
  }
}
