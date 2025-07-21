export interface PokemonListItem {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    [key: string]: string | null;
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  // Add more fields as needed
}
const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemonList(limit: number = 151): Promise<PokemonListItem[]> {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}`);
  const data = await response.json();
  return data.results;
}

export async function getPokemonDetails(name: string): Promise<Pokemon> {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${name}`);
  return response.json();
}
