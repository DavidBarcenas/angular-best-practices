import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subject, catchError, finalize, mergeMap, throwError } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  template: `<h2>Error Handling</h2>
    <div *ngIf="showErrorMessage">Invalid email or password.</div>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input type="email" formControlName="email" />
      <input type="password" formControlName="password" />
      <button>Submit</button>
    </form>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, ReactiveFormsModule]
})
export class ErrorHandlingComponent {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);
  form = this.fb.group({
    email: '',
    password: ''
  });
  showErrorMessage = false;

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
        ),
        catchError(error => {
          console.error('catchError: ', error);
          this.showErrorMessage = true;
          return throwError(() => error);
        }),
        finalize(() => {
          // callback that can be used for a secondary effect
          console.log('finalize');
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
        })
      )
      .subscribe({
        error: e => console.error('observer: ', e),
        next: value => console.log('next: ', value),
        complete: () => console.log('complete')
      });

    subject.next(Boolean(this.form.value.email && this.form.value.password));
  }
}
