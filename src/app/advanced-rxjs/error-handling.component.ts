import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject, mergeMap, throwError } from 'rxjs';

@Component({
  template: `<h2>Error Handling</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input type="email" formControlName="email" />
      <input type="password" formControlName="password" />
      <button>Submit</button>
    </form>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorHandlingComponent {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);
  form = this.fb.group({
    email: '',
    password: ''
  });

  onSubmit(): void {
    const subject = new Subject<boolean>();
    // If the fields are invalid it will emits an error notification,
    // otherwise it will make the request to the API
    subject
      .pipe(
        mergeMap(isValid =>
          isValid
            ? this.http.post('https://reqres.in/api/login', {
                email: this.form.value.email,
                password: this.form.value.password
              })
            : throwError(() => 'Invalid email or password.')
        )
      )
      .subscribe({
        error: e => console.error('observer: ', e),
        next: value => console.log('next: ', value),
        complete: () => console.log('complete')
      });

    subject.next(Boolean(this.form.value.email && this.form.value.password));
  }
}
