import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedRxjsComponent } from './advanced-rxjs.component';
import { RouterModule, Routes } from '@angular/router';
import { SubjectComponent } from './subject.component';

const routes: Routes = [
  {
    path: '',
    component: AdvancedRxjsComponent,
    children: [
      { path: 'subjects', component: SubjectComponent },
      { path: '', redirectTo: 'subject', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [AdvancedRxjsComponent, SubjectComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class AdvancedRxjsModule {}
