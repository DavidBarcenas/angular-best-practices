import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ButtonComponent } from '../../core/button/button.component';

@Component({
  selector: 'app-dynamic-forms-page',
  standalone: true,
  templateUrl: './dynamic-forms-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ButtonComponent],
})
export class DynamicFormsPageComponent implements OnInit {
  private http = inject(HttpClient);
  protected formLoadingTrigger = new Subject<'user' | 'company'>();
  protected formConfig$: Observable<object> | undefined;

  ngOnInit(): void {
    this.formConfig$ = this.formLoadingTrigger.pipe(switchMap((config) => this.http.get(`assets/${config}.form.json`)));
  }
}
