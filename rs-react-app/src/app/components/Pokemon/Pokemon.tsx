import { Component } from 'react';
import type { IPokemonProps } from '../../../types/types';

class Pokemon extends Component<IPokemonProps> {
  render() {
    const { pokemonData } = this.props;
    const { name, url } = pokemonData;

    return (
      <div className="search-results__item">
        <p>{`${name[0].toUpperCase()}${name.slice(1)}`}</p>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      </div>
    );
  }
}

export default Pokemon;
