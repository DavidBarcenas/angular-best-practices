import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ButtonComponent } from '../../core/button/button.component';
import { DynamicControl, DynamicFormConfig } from '../dynamic-forms.model';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { banWord } from 'src/app/reactive-forms/validators/ban-word.validator';
import { DynamicControlResolver } from '../dynamic-control-resolver.service';
import { ControlInjectorPipe } from '../control-injector.pipe';

@Component({
  selector: 'app-dynamic-forms-page',
  standalone: true,
  templateUrl: './dynamic-forms-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, ControlInjectorPipe],
})
export class DynamicFormsPageComponent implements OnInit {
  private http = inject(HttpClient);
  protected controlResolver = inject(DynamicControlResolver);
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
      const validators = this.resolveValidators(controls[key]);
      this.form?.addControl(key, new FormControl(controls[key].value, validators));
    });
  }

  private resolveValidators({
    validators = {},
  }: DynamicControl): ((control: AbstractControl) => ValidationErrors | null)[] {
    return (Object.keys(validators) as Array<keyof typeof validators>).map((validatorKey) => {
      const validatorValue = validators[validatorKey];
      if (validatorKey === 'required') {
        return Validators.required;
      }
      if (validatorKey === 'requiredTrue') {
        return Validators.requiredTrue;
      }
      if (validatorKey === 'email') {
        return Validators.email;
      }
      if (validatorKey === 'minLength' && typeof validatorValue === 'number') {
        return Validators.minLength(validatorValue);
      }
      if (validatorKey === 'banWords' && Array.isArray(validatorValue)) {
        return banWord(validatorValue);
      }
      return Validators.nullValidator;
    });
  }
}
