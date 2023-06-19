import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedRxjsComponent } from './advanced-rxjs.component';
import { RouterModule, Routes } from '@angular/router';
import { SubjectComponent } from './workshop/subject.component';
import { ErrorHandlingComponent } from './workshop/error-handling.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomOperatorsComponent } from './workshop/custom-operators.component';

const routes: Routes = [
  {
    path: '',
    component: AdvancedRxjsComponent,
    children: [
      { path: 'subjects', component: SubjectComponent },
      { path: 'error-handling', component: ErrorHandlingComponent },
      { path: 'custom-operators', component: CustomOperatorsComponent },
      { path: '', redirectTo: 'custom-operators', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    AdvancedRxjsComponent,
    SubjectComponent,
    ErrorHandlingComponent,
    CustomOperatorsComponent
  ]
})
export class AdvancedRxjsModule {}
