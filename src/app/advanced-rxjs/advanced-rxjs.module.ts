import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedRxjsComponent } from './advanced-rxjs.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AdvancedRxjsComponent
  }
];

@NgModule({
  declarations: [AdvancedRxjsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class AdvancedRxjsModule {}
