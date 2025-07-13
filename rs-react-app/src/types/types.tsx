interface IPokemonData {
  name: string;
  url: string;
}

export interface IPokemonProps {
  pokemonData: IPokemonData;
}

export interface IPokemonListProps {
  data: IPokemonData[];
}
