import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
  {
    path: '',
    component: HeroesComponent,
    children: []
  }
];

@NgModule({
  declarations: [HeroesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ReactiveCodeModule {}
