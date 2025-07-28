import './PokemonList.css';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import type { IPokemonListProps } from '../../../types/types';
import Pokemon from '../Pokemon/Pokemon';

const PokemonList = (props: IPokemonListProps) => {
  const { data, currentPage } = props;

  const pokemonElements = data.map((pokemon, index) => {
    if (!pokemon) {
      return (
        <ErrorBoundary key={`error-boundary-${index}`}>
          <h3 className="mb-3 mt-4 text-gray-500 text-2xl font-bold">
            ⚠️ Invalid Pokemon Data ⚠️
          </h3>
          <p className="mb-4 mt-3 text-gray-500 text-xl font-bold">
            Please Enter Full Name or Id
          </p>
        </ErrorBoundary>
      );
    }

    return (
      <ErrorBoundary key={`error-boundary-${index}`}>
        <Pokemon key={index} pokemonData={pokemon} page={currentPage} />
      </ErrorBoundary>
    );
  });

  return <ul className="search-results">{pokemonElements}</ul>;
};

export default PokemonList;
