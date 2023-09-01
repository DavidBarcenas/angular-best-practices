import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Observable, Subject, map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { DynamicControlResolver } from '../dynamic-control-resolver.service';
import { ControlInjectorPipe } from '../control-injector.pipe';
import { DynamicControlOutletComponent } from '../dynamic-controls/dynamic-control-outlet.component';
import { ButtonComponent } from '../../core/button/button.component';
import { DynamicFormConfig } from '../dynamic-forms.model';
import { compareFn, sharedDynamicControlDeps } from '../dynamic-controls/base-dynamic-control';
import { ErrorStateMatcher, OnTouchedErrorStateMatcher } from 'src/app/core/input-error/error-state-matcher.service';

@Component({
  selector: 'app-dynamic-forms-page',
  standalone: true,
  templateUrl: './dynamic-forms-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...sharedDynamicControlDeps, ButtonComponent, ControlInjectorPipe, DynamicControlOutletComponent],
  providers: [
    {
      provide: ErrorStateMatcher,
      useClass: OnTouchedErrorStateMatcher,
    },
  ],
})
export class DynamicFormsPageComponent implements OnInit {
  private http = inject(HttpClient);
  protected controlResolver = inject(DynamicControlResolver);
  protected formLoadingTrigger = new Subject<'user' | 'company'>();
  protected formConfig$: Observable<{ form: FormGroup; config: DynamicFormConfig }> | undefined;
  protected compareFn = compareFn;

  ngOnInit(): void {
    this.formConfig$ = this.formLoadingTrigger.pipe(
      switchMap((config) => this.http.get<DynamicFormConfig>(`assets/${config}.form.json`)),
      map((config) => ({
        config,
        form: new FormGroup({}),
      }))
    );
  }

  protected onSubmit(form: FormGroup) {
    console.log(form.getRawValue());
    form.reset();
  }
}
