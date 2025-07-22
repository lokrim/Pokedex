import { Pokemon, PokemonListItem } from './types';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

function getRandomPokemonIds(count: number, max: number = 1025): number[] {
  const ids: number[] = [];
  while (ids.length < count) {
    const id = Math.floor(Math.random() * max) + 1;
    if (!ids.includes(id)) {
      ids.push(id);
    }
  }
  return ids;
}

export async function getPokemonList(limit: number = 151): Promise<PokemonListItem[]> {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}`);
  const data = await response.json();
  return data.results;
}

export async function getPokemonDetails(name: string): Promise<Pokemon> {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${name}`);
  return response.json();
}

export async function getRandomPokemon(count: number = 20, max: number = 1025): Promise<Pokemon[]> {
  try {
    const randomIds = getRandomPokemonIds(count, max);
    
    const pokemonPromises = randomIds.map(id => 
      fetch(`${POKEAPI_BASE_URL}/pokemon/${id}`)
        .then(res => {
          if (!res.ok) throw new Error(`Failed to fetch Pokémon #${id}`);
          return res.json();
        })
    );
    
    return await Promise.all(pokemonPromises);
  } catch (error) {
    console.error("Error fetching random Pokemon:", error);
    throw error;
  }
}
