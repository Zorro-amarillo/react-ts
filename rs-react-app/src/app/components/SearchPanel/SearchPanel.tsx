import './SearchPanel.css';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from 'react';
import PokemonService from '../../services/PokemonService/PokemonService';
import PokemonList from '../PokemonList/PokemonList';
import type { IPokemonData } from '../../../types/types';
import Loader from '../Loader/Loader';

const SearchPanel = () => {
  const [inputValue, setInputValue] = useState(
    localStorage.getItem('lastPokemonSearch') ?? ''
  );
  const [searchResults, setSearchResults] = useState<IPokemonData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorBoundary, setIsErrorBoundary] = useState(false);

  const pokemonService = useMemo(() => new PokemonService(), []);

  const loadAllPokemons = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await pokemonService.getAllPokemons();

      setSearchResults(data.results);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(`SearchPanel.loadAllPokemons() failed: ${err}`);
    }
  }, [pokemonService]);

  const searchPokemon = useCallback(
    async (e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.preventDefault();
      setIsLoading(true);

      try {
        localStorage.setItem('lastPokemonSearch', inputValue.toLowerCase());

        if (!inputValue.trim()) {
          const allPokemons = await pokemonService.getAllPokemons();
          console.log('Input is empty. Found Pokemons:', allPokemons.results);

          setSearchResults(allPokemons.results);
          setIsLoading(false);
        } else {
          const pokemon = await pokemonService.getPokemon(inputValue);

          setSearchResults([pokemon]);
          setIsLoading(false);

          if (pokemon !== undefined) {
            console.log('Found Pokemon:', pokemon);
          }
        }
      } catch (err) {
        setIsLoading(false);
        console.error(`SearchPanel.searchPokemon() failed. ${err}`);
      }
    },
    [inputValue, pokemonService]
  );

  const loadStartData = useCallback(
    () => async () => {
      if (inputValue) {
        await searchPokemon();
      } else {
        loadAllPokemons();
      }
    },
    [inputValue, loadAllPokemons, searchPokemon]
  );

  useEffect(() => {
    loadStartData();
  }, [loadStartData]);

  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  if (isErrorBoundary) {
    throw new Error('Special Error to Test ErrorBoundary');
  }

  return (
    <div>
      <form className="form">
        <input
          className="input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="text"
          placeholder="Enter Full Name or Id"
          onChange={(e) => onInputValueChange(e)}
          value={inputValue}
        />
        <button
          onClick={searchPokemon}
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500
            hover:bg-gradient-to-l focus:ring-4 focus:outline-none
            focus:ring-purple-200 dark:focus:ring-purple-800
            font-medium rounded-lg text-xs
            px-4 py-2
            whitespace-nowrap"
        >
          Search Pokemon
        </button>
      </form>
      <h1 className="mb-4 mt-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Pokemon Search Results
      </h1>
      <div className="search-results__title">
        <h2 className="text-3xl font-extrabold text-gray-500">Pokemon</h2>
        <h2 className="text-3xl font-extrabold text-gray-500">
          Link to Pokemon JSON
        </h2>
      </div>
      {isLoading ? <Loader /> : <PokemonList data={searchResults} />}
      <button
        type="button"
        onClick={() => setIsErrorBoundary(true)}
        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Error Button
      </button>
    </div>
  );
};

export default SearchPanel;
