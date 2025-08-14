import { ErrorText } from '@/shared/constants';
import type { IPokemonListProps } from '@/shared/types';
import { ErrorBoundary, ErrorMessage, Pokemon } from '@components';

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
