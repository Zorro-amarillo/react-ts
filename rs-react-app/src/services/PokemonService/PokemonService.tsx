import type { IServiceError } from '../../types/types';

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

class PokemonService {
  allPokemonsUrl = 'https://pokeapi.co/api/v2/pokemon';

  getPokemonData = async (url: string) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();

        throw new ServiceError(
          `PokemonService.getPokemonData() failed, url: ${url}`,
          response.status,
          errorText
        );
      }

      return await response.json();
    } catch (err) {
      if (err instanceof Error) {
        if ('status' in err && 'errorText' in err) {
          console.error(
            `${err}. Status: ${err.status}. Error text: ${err.errorText}`
          );
        }
      }
    }
  };

  getAllPokemons = async (page = 1) => {
    const pageLimit = 20;
    const offset = (page - 1) * pageLimit;
    const urlToRender = `${this.allPokemonsUrl}?limit=${pageLimit}&offset=${offset}`;

    return await this.getPokemonData(urlToRender);
  };

  getPokemon = async (pokemon: string) => {
    try {
      const url = `${this.allPokemonsUrl}/${pokemon}`;
      const pokemonData = await this.getPokemonData(url);

      if (!pokemonData) {
        throw new Error('Pokemon is not found');
      }

      pokemonData.url = `${this.allPokemonsUrl}/${pokemonData.id}`;

      return pokemonData;
    } catch (err) {
      if (err instanceof Error) {
        if (err.message !== 'Pokemon is not found') {
          console.error(err);
        }
      }
    }
  };
}

export default PokemonService;
