import ErrorBoundary from './ErrorBoundary';
import Pokemon from './Pokemon';

import type { IPokemonListProps } from '../../types/types';

const PokemonList = (props: IPokemonListProps) => {
  const { data, currentPage } = props;

  const pokemonElements = data.map((pokemon, index) => {
    if (!pokemon) {
      return (
        <ErrorBoundary key={`error-boundary-${index}`}>
          <h3 className="mb-3 mt-4 text-gray-500 text-2xl font-bold">⚠️ Invalid Pokemon Data ⚠️</h3>
          <p className="mb-4 mt-3 text-gray-500 text-xl font-bold">Please Enter Full Name or Id</p>
        </ErrorBoundary>
      );
    }

    return (
      <ErrorBoundary key={`error-boundary-${index}`}>
        <Pokemon key={index} pokemonData={pokemon} page={currentPage} data-testid="pokemon-item" />
      </ErrorBoundary>
    );
  });

  return <ul className="search-results ps-0">{pokemonElements}</ul>;
};

export default PokemonList;
