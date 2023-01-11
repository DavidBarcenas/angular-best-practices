import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedRxjsComponent } from './advanced-rxjs.component';
import { RouterModule, Routes } from '@angular/router';
import { SubjectComponent } from './subject.component';
import { ErrorHandlingComponent } from './error-handling.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AdvancedRxjsComponent,
    children: [
      { path: 'subjects', component: SubjectComponent },
      { path: 'error-handling', component: ErrorHandlingComponent },
      { path: '', redirectTo: 'error-handling', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [AdvancedRxjsComponent, SubjectComponent, ErrorHandlingComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)]
})
export class AdvancedRxjsModule {}
