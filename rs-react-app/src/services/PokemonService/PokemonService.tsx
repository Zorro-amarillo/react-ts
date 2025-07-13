class PokemonService {
  allPokemonsUrl = 'https://pokeapi.co/api/v2/pokemon';

  getPokemonData = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `PokemonService.getResource error. Url: ${url}. Status: ${response.status}`
      );
    }

    const result = await response.json();
    return result;
  };

  getAllPokemons = async (page = 1) => {
    const pageLimit = 20;
    const offset = (page - 1) * pageLimit;
    const urlToRender = `${this.allPokemonsUrl}?limit=${pageLimit}&offset=${offset}`;

    return await this.getPokemonData(urlToRender);
  };

  getPokemon = async (pokemon: string) => {
    const url = `${this.allPokemonsUrl}/${pokemon}`;
    const pokemonData = await this.getPokemonData(url);
    pokemonData.url = `${this.allPokemonsUrl}/${pokemonData.id}`;

    return pokemonData;
  };
}

export default PokemonService;
