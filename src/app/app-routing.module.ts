import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPokemonsComponent } from './pages/my-pokemons/my-pokemons.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PokemonWorldComponent } from './pages/pokemon-world/pokemon-world.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';

const routes: Routes = [
  {path: 'pokemon-world', component: PokemonWorldComponent},
  {path: 'pokemon/:id', component: PokemonComponent},
  {path: 'my-pokemons', component: MyPokemonsComponent},
  {path: '', redirectTo: '/pokemon-world', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
