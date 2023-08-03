import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@polymer/paper-input/paper-textarea';
import { ButtonComponent } from '../../core/button/button.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EditableContentDirective } from '../value-accesor/editable-content.directive';
import { RatingPickerOptionsComponent } from '../rating-picker-options/rating-picker-options.component';

@Component({
  selector: 'app-rating-picker-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule, EditableContentDirective, RatingPickerOptionsComponent],
  templateUrl: './rating-picker-page.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingPickerPageComponent {
  private fb = inject(FormBuilder);
  form = this.fb.group({
    reviewText: [''],
  });

  onSubmit(): void {
    console.log(this.form.getRawValue());
    this.form.reset();
  }
}
