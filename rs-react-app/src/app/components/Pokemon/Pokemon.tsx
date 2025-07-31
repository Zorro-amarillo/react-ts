import { Link } from 'react-router-dom';

import type { IPokemonProps } from '../../../types/types';

const Pokemon = (props: IPokemonProps) => {
  const { pokemonData, page } = props;
  const { name, url } = pokemonData;

  return (
    <li
      className="search-results__item flex items-center
      border border-gray-200
      hover:border-gray-300
      cursor-pointer
      transition-colors
      duration-200
      rounded-lg
      p-4
      mb-1
      hover:shadow-sm
      justify-center
      "
    >
      <Link
        to={`/${page}/${name}`}
        className="flex flex-wrap items-center gap-4 w-full justify-center"
      >
        <p className="text-gray-500 flex-shrink-0">{`${name[0].toUpperCase()}${name.slice(1)}`}</p>
        <p className="text-gray-500">{url}</p>
      </Link>
    </li>
  );
};

export default Pokemon;
