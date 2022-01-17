import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { PokeApiResponse, PokemonResults } from '../interfaces/pokeApiResponse.interface';
import { Pokemon, PokemonItem } from '../interfaces/pokemon.interface';
import { environment } from '../../environments/environment';
import { pokemonMapper } from '../utils/mapper';

@Injectable({
  providedIn: 'root'
})
export class GetPokemonsService {
  private pokemonsDetails: Pokemon[] = []

  constructor(private readonly http: HttpClient) { }

  public getPokemons({
    limit = environment.itemsPerPage, 
    offset = environment.offsetDefault
  }): Observable<PokemonItem[]> {
    return this.http.get<PokeApiResponse>(`${environment.pokeApi}?limit=${limit}&offset=${offset}`)
      .pipe(
        switchMap(({results}) => forkJoin(this.getPokemonsData(results))),
        tap(pokemons => this.pokemonsDetails = pokemons),
        map(pokemons => pokemons.map(p => pokemonMapper(p)))
      )
  }

  public getPokemonDetails(id: number): Pokemon | undefined {
    return this.pokemonsDetails.find(p => p.id === id)
  }

  public fetchPokemonDetails(id:number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${environment.pokeApi}/${id}`)
  }
  
  private getPokemonsData(pokemonsList: PokemonResults[]): Observable<Pokemon>[] {
    return pokemonsList.map(({url}) => this.http.get<Pokemon>(url))
  }
}
