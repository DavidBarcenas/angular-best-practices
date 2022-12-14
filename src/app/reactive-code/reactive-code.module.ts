import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes.component';
import { HeroTableComponent } from './hero-table/hero-table.component';
import { HeroCardComponent } from './hero-card/hero-card.component';

const routes: Routes = [
  {
    path: '',
    component: HeroesComponent,
    children: [
      { path: 'all', component: HeroTableComponent },
      { path: '', pathMatch: 'full', redirectTo: 'all' }
    ]
  }
];

@NgModule({
  declarations: [HeroesComponent, HeroTableComponent, HeroCardComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ReactiveCodeModule {}
