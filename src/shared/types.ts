export interface IPokemon {
  sprites: { front_default: string | undefined };
  height: number;
  weight: number;
}

export interface IPokemonData {
  name: string;
  url: string;
  id?: number;
}

export interface IPokemonProps {
  pokemonData: IPokemonData | null;
  page: number;
}

export interface IPokemonListProps {
  data: (IPokemonData | null)[];
  currentPage: number;
}

export interface IErrorBoundaryState {
  error: boolean;
}

export interface IBackToMainButtonProps {
  text: string;
}

export interface IPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}
