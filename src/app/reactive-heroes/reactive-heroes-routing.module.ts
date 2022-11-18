import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroeDetailsComponent } from './heroe-details/heroe-details.component';
import { HeroeTableComponent } from './heroe-table/heroe-table.component';
import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
  {
    path: '',
    component: HeroesComponent,
    children: [
      { path: 'all', component: HeroeTableComponent },
      { path: 'hero/:id', component: HeroeDetailsComponent },
      { path: '', pathMatch: 'full', redirectTo: 'all' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReactiveHeroesRoutingModule {}
