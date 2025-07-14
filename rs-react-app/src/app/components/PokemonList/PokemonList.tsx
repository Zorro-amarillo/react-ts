import './PokemonList.css';
import { Component } from 'react';
import type { IPokemonListProps } from '../../../types/types';
import Pokemon from '../Pokemon/Pokemon';
import PokemonService from '../../../services/PokemonService/PokemonService';

class PokemonList extends Component<IPokemonListProps> {
  pokemonService = new PokemonService();

  render() {
    const { data } = this.props;

    const pokemonElements = data.map((pokemon, index) => {
      return <Pokemon key={index} pokemonData={pokemon} />;
    });

    return <ul className="search-results">{pokemonElements}</ul>;
  }
}

export default PokemonList;
