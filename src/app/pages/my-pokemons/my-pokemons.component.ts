import { Component, OnInit } from '@angular/core';
import { PokemonItem } from 'src/app/interfaces/pokemon.interface';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-my-pokemons',
  templateUrl: './my-pokemons.component.html',
  styleUrls: ['./my-pokemons.component.scss']
})
export class MyPokemonsComponent implements OnInit {
  public favorites: PokemonItem[] = []
  public resultsLength!: number;

  constructor(private readonly storeService: StoreService) { }

  public ngOnInit(): void {
    this.favorites = this.storeService.getFavorites()
    this.resultsLength = this.favorites.length
  }
}
