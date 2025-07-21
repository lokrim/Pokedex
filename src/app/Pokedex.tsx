"use client";
import { useEffect, useState } from "react";

export default function Pokedex() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((res) => res.json())
      .then((data) => setPokemon(data.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pokedex</h1>
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {pokemon.map((p: any, idx: number) => (
          <li key={p.name} className="bg-white/80 rounded shadow p-4 flex flex-col items-center">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idx + 1}.png`}
              alt={p.name}
              width={80}
              height={80}
              className="mb-2"
            />
            <span className="capitalize font-medium">{p.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
