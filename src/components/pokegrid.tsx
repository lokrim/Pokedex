"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getRandomPokemon } from "@/lib/api";
import type { Pokemon } from "@/lib/types";

export default function PokeGrid() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPokemon() {
      try {
        const data = await getRandomPokemon(20);
        setPokemon(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">Loading...</div>
    );
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {pokemon.map((p) => (
          <div
            key={p.id}
            className="max-w-sm border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-gray-800 border-gray-700"
          >
            <div className="flex justify-center pt-4 rounded-t-lg bg-gray-700">
              <Image
                src={
                  p.sprites.front_default ||
                  `/images/pokemon-placeholder.png`
                }
                alt={p.name}
                width={120}
                height={120}
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="p-5">
              <h5 className="mb-2 text-xl font-bold tracking-tight capitalize text-white">
                #{p.id} {p.name}
              </h5>
              <div className="mb-3 flex gap-2">
                {p.types.map((typeInfo) => (
                  <span
                    key={typeInfo.type.name}
                    className="px-2 py-1 text-xs rounded-full text-white capitalize"
                    style={{
                      backgroundColor: getTypeColor(typeInfo.type.name),
                    }}
                  >
                    {typeInfo.type.name}
                  </span>
                ))}
              </div>
              <Link
                href={`/pokemon/${p.id}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none  bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
              >
                View details
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Keep the helper function in the component since it's UI related
function getTypeColor(type: string): string {
  const typeColors: Record<string, string> = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
    default: "#777777",
  };

  return typeColors[type] || typeColors.default;
}
