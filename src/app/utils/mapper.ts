import { Pokemon, PokemonItem } from "../interfaces/pokemon.interface";

export function pokemonMapper(pokemon: Pokemon): PokemonItem {
  const {id, name, types, abilities, sprites} = pokemon;
  return {
    id,
    name, 
    image: sprites.front_default,
    type: types.map(({type}) => type.name).join(', '), 
    ability: abilities.map(({ability}) => ability.name).join(', ')
  }
}