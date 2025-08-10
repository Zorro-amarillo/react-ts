import { Link } from 'react-router-dom';

import { ErrorMessage } from '../';
import { BASE_URL, ErrorText } from '../../shared/constants';

import type { IPokemonProps } from '../../shared/types';

const Pokemon = (props: IPokemonProps) => {
  const { pokemonData, page } = props;

  if (!pokemonData) {
    return <ErrorMessage message={ErrorText.tryAgain} />;
  }

  const { name, url, id } = pokemonData;
  const currentUrl = url ?? `${BASE_URL}/${id}`;

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
      gap-5
      "
    >
      <Link
        to={`/${page}/${name}`}
        className="flex flex-wrap items-center gap-4 w-full justify-center"
      >
        <p className="text-gray-500 flex-shrink-0">{`${name[0].toUpperCase()}${name.slice(1)}`}</p>
        <p className="text-gray-500">{currentUrl}</p>
      </Link>
    </li>
  );
};

export default Pokemon;
