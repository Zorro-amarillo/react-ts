import './PokemonList.css';
import { Component } from 'react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import type { IPokemonListProps } from '../../../types/types';
import Pokemon from '../Pokemon/Pokemon';
import PokemonService from '../../../services/PokemonService/PokemonService';

class PokemonList extends Component<IPokemonListProps> {
  pokemonService = new PokemonService();

  render() {
    const { data } = this.props;

    const pokemonElements = data.map((pokemon, index) => {
      if (!pokemon) {
        return (
          <ErrorBoundary key={`error-boundary-${index}`}>
            <h3 className="mb-3 mt-4 text-red-500 text-2xl font-bold">
              ⚠️ Invalid Pokemon Data ⚠️
            </h3>
            <p className="mb-4 mt-3 text-red-500 text-xl font-bold">
              Please Enter Full Name or Id
            </p>
          </ErrorBoundary>
        );
      }

      return (
        <ErrorBoundary key={`error-boundary-${index}`}>
          <Pokemon key={index} pokemonData={pokemon} />
        </ErrorBoundary>
      );
    });

    return <ul className="search-results">{pokemonElements}</ul>;
  }
}

export default PokemonList;
