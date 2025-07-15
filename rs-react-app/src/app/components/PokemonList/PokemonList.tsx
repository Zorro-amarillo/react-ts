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
            <div>⚠️ Invalid Pokemon Data. Please Enter Full Name or Id ⚠️</div>
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
