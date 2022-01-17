import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { PokemonWorldComponent } from './pages/pokemon-world/pokemon-world.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { MyPokemonsComponent } from './pages/my-pokemons/my-pokemons.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PokemonGridComponent } from './components/pokemon-grid/pokemon-grid.component';
import { HeaderComponent } from './components/header/header.component';
import { ConvertUnitPipe } from './pipes/convert-unit.pipe';
import { TransformIdPipe } from './pipes/transform-id.pipe';
import { FlatMapPipe } from './pipes/flat-map.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PokemonWorldComponent,
    PokemonComponent,
    MyPokemonsComponent,
    NotFoundComponent,
    PokemonGridComponent,
    HeaderComponent,
    ConvertUnitPipe,
    TransformIdPipe,
    FlatMapPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
