import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveHeroesRoutingModule } from './reactive-heroes-routing.module';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroeBadgeComponent } from './heroe-badge/heroe-badge.component';
import { HeroeDetailsComponent } from './heroe-details/heroe-details.component';
import { HeroeTableComponent } from './heroe-table/heroe-table.component';

@NgModule({
  declarations: [HeroesComponent, HeroeBadgeComponent, HeroeDetailsComponent, HeroeTableComponent],
  imports: [CommonModule, ReactiveHeroesRoutingModule],
})
export class ReactiveHeroesModule {}
