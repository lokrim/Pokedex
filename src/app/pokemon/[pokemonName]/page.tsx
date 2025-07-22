'use client';

import { getPokemonDetails } from '@/lib/api';
import { Pokemon } from '@/lib/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface PokemonPageProps {
  params: {
    pokemonName: string;
  };
}

export default function PokemonPage({ params }: PokemonPageProps) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const pokemonData = await getPokemonDetails(params.pokemonName);
        setPokemon(pokemonData);
      } catch (err) {
        setError('Failed to fetch Pokémon data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [params.pokemonName]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!pokemon) {
    return <div className="text-center">Pokémon not found.</div>;
  }

  const getTypeColor = (type: string): string => {
    const typeColors: Record<string, string> = {
      normal: '#A8A77A',
      fire: '#EE8130',
      water: '#6390F0',
      electric: '#F7D02C',
      grass: '#7AC74C',
      ice: '#96D9D6',
      fighting: '#C22E28',
      poison: '#A33EA1',
      ground: '#E2BF65',
      flying: '#A98FF3',
      psychic: '#F95587',
      bug: '#A6B91A',
      rock: '#B6A136',
      ghost: '#735797',
      dragon: '#6F35FC',
      dark: '#705746',
      steel: '#B7B7CE',
      fairy: '#D685AD',
      default: '#777777',
    };
    return typeColors[type] || typeColors.default;
  };

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <div className="rounded-lg shadow-lg p-6 bg-white/10 backdrop-blur-sm">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
          <span className="text-xl text-gray-400">#{String(pokemon.id).padStart(3, '0')}</span>
          <div className="relative w-48 h-48">
            <Image
              src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Height</h3>
              <p>{pokemon.height / 10} m</p>
            </div>
            <div>
              <h3 className="font-semibold">Weight</h3>
              <p>{pokemon.weight / 10} kg</p>
            </div>
            <div>
              <h3 className="font-semibold">Abilities</h3>
              <ul>
                {pokemon.abilities.map(({ ability, is_hidden }) => (
                  <li key={ability.name} className="capitalize">
                    {ability.name} {is_hidden && '(Hidden)'}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Types</h3>
              <div className="flex gap-2">
                {pokemon.types.map(({ type }) => (
                  <span
                    key={type.name}
                    className="px-3 py-1 rounded-full text-white text-sm capitalize"
                    style={{ backgroundColor: getTypeColor(type.name) }}
                  >
                    {type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Base Stats</h2>
          {pokemon.stats.map(({ stat, base_stat }) => (
            <div key={stat.name} className="flex items-center gap-4 mb-2">
              <p className="w-1/3 capitalize font-medium">{stat.name}</p>
              <div className="w-2/3 bg-gray-700 rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full"
                  style={{ width: `${(base_stat / 255) * 100}%` }}
                ></div>
              </div>
              <p className="w-12 text-right">{base_stat}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
