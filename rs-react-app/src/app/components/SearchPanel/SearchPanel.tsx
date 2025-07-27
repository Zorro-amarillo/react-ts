import './SearchPanel.css';
import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import usePokemonService from '../../services/usePokemonService/usePokemonService';
import PokemonList from '../PokemonList/PokemonList';
import type { IPokemonData } from '../../../types/types';
import Loader from '../Loader/Loader';
import useLocalStorage from '../../hooks/useLocalStorage';

const SearchPanel = () => {
  const [searchResults, setSearchResults] = useState<IPokemonData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { getAllPokemons, getPokemon } = usePokemonService();
  const { savedPokemon, savePokemon } = useLocalStorage();
  const inputValue = savedPokemon;

  const loadAllPokemons = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await getAllPokemons(1);

      setSearchResults(data.results);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(`SearchPanel.loadAllPokemons() failed: ${err}`);
    }
  }, [getAllPokemons]);

  const searchPokemon = useCallback(
    async (e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.preventDefault();
      setIsLoading(true);

      try {
        if (!inputValue.trim()) {
          const allPokemons = await getAllPokemons(1);
          console.log('Input is empty. Found Pokemons:', allPokemons.results);

          setSearchResults(allPokemons.results);
          setIsLoading(false);
        } else {
          const pokemon = await getPokemon(inputValue);

          setSearchResults([pokemon]);
          setIsLoading(false);

          if (pokemon !== undefined) {
            console.log('Found Pokemon:', pokemon);
          }
        }
      } catch (err) {
        setIsLoading(false);
        console.error(`SearchPanel searchPokemon() failed. ${err}`);
      }
    },
    [inputValue, getAllPokemons, getPokemon]
  );

  const loadStartData = useCallback(async () => {
    if (inputValue) {
      await searchPokemon();
    } else {
      await loadAllPokemons();
    }
  }, [inputValue, loadAllPokemons, searchPokemon]);

  useEffect(() => {
    loadStartData();
  }, [loadStartData]);

  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    savePokemon(event.target.value);
  };

  return (
    <>
      <main className="p-8 flex-grow">
        <form className="form w-2/3 mx-auto">
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
        <h1 className="mb-4 mt-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          Pokemon Search Results
        </h1>
        <div className="search-results__title mb-8">
          <h2 className="text-3xl font-extrabold text-gray-500">Pokemon</h2>
          <h2 className="text-3xl font-extrabold text-gray-500">
            Link to Data
          </h2>
        </div>
        {isLoading ? <Loader /> : <PokemonList data={searchResults} />}
      </main>
    </>
  );
};

export default SearchPanel;
