import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ButtonComponent } from '../../core/button/button.component';
import { DynamicFormConfig } from '../dynamic-forms.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-forms-page',
  standalone: true,
  templateUrl: './dynamic-forms-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
})
export class DynamicFormsPageComponent implements OnInit {
  private http = inject(HttpClient);
  protected formLoadingTrigger = new Subject<'user' | 'company'>();
  protected formConfig$: Observable<DynamicFormConfig> | undefined;
  form!: FormGroup;

  ngOnInit(): void {
    this.formConfig$ = this.formLoadingTrigger.pipe(
      switchMap((config) => this.http.get<DynamicFormConfig>(`assets/${config}.form.json`)),
      tap(({ controls }) => this.buildForm(controls))
    );
  }

  protected onSubmit() {
    console.log(this.form.getRawValue());
  }

  private buildForm(controls: DynamicFormConfig['controls']): void {
    this.form = new FormGroup({});
    Object.keys(controls).forEach((key) => {
      this.form?.addControl(key, new FormControl(controls[key].value));
    });
  }
}
