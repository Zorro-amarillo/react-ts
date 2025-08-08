import { ErrorText } from '../../shared/constants';
import ErrorBoundary from '../ErrorBoundary';
import ErrorMessage from '../ErrorMessage';
import Pokemon from './Pokemon';

import type { IPokemonListProps } from '../../shared/types';

const PokemonList = (props: IPokemonListProps) => {
  const { data, currentPage } = props;

  const pokemonElements = data.map((pokemon, index) => {
    if (!pokemon) {
      return (
        <ErrorBoundary key={`error-boundary-${index}`}>
          <ErrorMessage message={ErrorText.enterName} />
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
