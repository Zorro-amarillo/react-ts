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

export interface IErrorBoundaryProps {
  children: React.ReactNode;
}

export interface IErrorBoundaryState {
  error: boolean;
}

export interface IServiceError {
  status: number;
  errorText: string;
}
