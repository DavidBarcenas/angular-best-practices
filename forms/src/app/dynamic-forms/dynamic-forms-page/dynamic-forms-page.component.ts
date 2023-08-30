import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicControlResolver } from '../dynamic-control-resolver.service';
import { ControlInjectorPipe } from '../control-injector.pipe';
import { DynamicControlOutletComponent } from '../dynamic-controls/dynamic-control-outlet.component';
import { ButtonComponent } from '../../core/button/button.component';
import { DynamicFormConfig } from '../dynamic-forms.model';
import { compareFn } from '../dynamic-controls/base-dynamic-control';

@Component({
  selector: 'app-dynamic-forms-page',
  standalone: true,
  templateUrl: './dynamic-forms-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, ControlInjectorPipe, DynamicControlOutletComponent],
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
