import { Component, OnInit } from '@angular/core';
import { PokemonItem } from 'src/app/interfaces/pokemon.interface';
import { GetPokemonsService } from 'src/app/services/get-pokemons.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pokemon-world',
  templateUrl: './pokemon-world.component.html',
  styleUrls: ['./pokemon-world.component.scss']
})
export class PokemonWorldComponent implements OnInit {
  public pokemonList: PokemonItem[] = []
  public resultsLength = environment.totalItems
  public isLoading = false

  constructor(private readonly getPokemonsService: GetPokemonsService) { }

  public ngOnInit(): void {
   this.getPokemons()
  }

  private getPokemons(offset?: number): void {
    this.isLoading = true
    this.getPokemonsService.getPokemons({offset})
    .subscribe({
      next: pokemons => {
        this.pokemonList = pokemons;
        this.isLoading = false;
      },
      error: error => {
        console.error(error.message);
        this.isLoading = false;
      }
    })
  }

  public changePage(pageIndex: number): void {
    this.getPokemons(pageIndex * environment.itemsPerPage)
  }
}
