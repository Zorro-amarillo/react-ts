import { useCallback } from 'react';

import { PAGE_LIMIT, BASE_URL } from '../utils/constants';

import type { IServiceError } from '../utils/types';

class ServiceError extends Error implements IServiceError {
  status: number;
  errorText: string;

  constructor(message: string, status: number, errorText: string) {
    super(message);
    this.name = 'ServiceError';
    this.status = status;
    this.errorText = errorText;
  }
}

const usePokemonService = () => {
  const getPokemonData = useCallback(async (url: string) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();

        throw new ServiceError(
          `usePokemonService getPokemonData() failed, url: ${url}`,
          response.status,
          errorText
        );
      }

      return await response.json();
    } catch (err) {
      if (err instanceof Error) {
        if ('status' in err && 'errorText' in err) {
          console.error(`${err}. Status: ${err.status}. Error text: ${err.errorText}`);
        }
      }
    }
  }, []);

  const getAllPokemons = useCallback(
    async (page = 1) => {
      const offset = (page - 1) * PAGE_LIMIT;
      const urlToRender = `${BASE_URL}?limit=${PAGE_LIMIT}&offset=${offset}`;

      return await getPokemonData(urlToRender);
    },
    [getPokemonData]
  );

  const getPokemon = useCallback(
    async (pokemon: string) => {
      try {
        const url = `${BASE_URL}/${pokemon}`;
        const pokemonData = await getPokemonData(url);

        if (!pokemonData) {
          throw new Error('Pokemon is not found');
        }

        pokemonData.url = `${BASE_URL}/${pokemonData.id}`;

        return pokemonData;
      } catch (err) {
        if (err instanceof Error) {
          if (err.message !== 'Pokemon is not found') {
            console.error(err);
          }
        }
      }
    },
    [getPokemonData]
  );

  return {
    getPokemonData,
    getAllPokemons,
    getPokemon,
  };
};

export default usePokemonService;
