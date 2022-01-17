import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs';
import { Pokemon } from 'src/app/interfaces/pokemon.interface';
import { GetPokemonsService } from 'src/app/services/get-pokemons.service';
import { StoreService } from 'src/app/services/store.service';
import { pokemonMapper } from 'src/app/utils/mapper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  public pokemon: Pokemon | undefined;
  public isCaptured = false

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly getPokemonsService: GetPokemonsService, 
    private readonly storeService: StoreService, 
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.params
    .pipe(pluck('id'))
    .subscribe(id => {
      const data = this.getPokemonsService.getPokemonDetails(+id)
      this.isCaptured = this.storeService.isFavorite(+id)

      if(data) {
        this.pokemon = data
      } else {
        this.getPokemonsService.fetchPokemonDetails(+id)
        .subscribe(resp => this.pokemon = resp)
      }
    })
  }

  public getPokemonImage(): string {
    return `${environment.pokemonImgUrl}/${this.pokemon?.id}.png`
  }

  public savePokemon() {
    if(this.pokemon) {
      if(this.isCaptured) {
        this.storeService.removeFromFavorites(this.pokemon.id)
        this.isCaptured = false
      } else {
        this.storeService.addToFavorites(pokemonMapper(this.pokemon))
        this.isCaptured = true
      }
    }
  }
}
