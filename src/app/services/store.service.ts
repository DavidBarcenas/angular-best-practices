import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PokemonItem } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private key = environment.favoritesKey

  public addToFavorites(pokemon: PokemonItem): void {
    const myFavorites = this.getFavorites()
    const newFavorites = myFavorites.length ? [...myFavorites, pokemon] : [pokemon]
    localStorage.setItem(this.key, JSON.stringify(newFavorites))
  }

  public removeFromFavorites(id: number): void {
    const myFavorites = this.getFavorites()

    if(myFavorites.length) {
      const updateFavorites = myFavorites.filter(p => p.id !== id)
      localStorage.setItem(this.key, JSON.stringify(updateFavorites))
    }
  }

  public isFavorite(id: number): boolean {
    return !!this.getFavorites().find(p => p.id === id)
  }

  public getFavorites(): PokemonItem[]  {
    const storedPokemons = localStorage.getItem(this.key)
    return storedPokemons ? JSON.parse(storedPokemons) : []
  }
}
