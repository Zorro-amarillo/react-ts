import type { IPokemonProps } from '../../../types/types';

const Pokemon = (props: IPokemonProps) => {
  const { pokemonData } = props;
  const { name, url } = pokemonData;

  return (
    <div className="search-results__item flex items-center gap-3 mb-3 mt-3">
      <p className="text-gray-500">{`${name[0].toUpperCase()}${name.slice(1)}`}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </a>
    </div>
  );
};

export default Pokemon;
