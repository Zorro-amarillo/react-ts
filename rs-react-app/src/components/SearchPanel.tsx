import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Loader from './Loader';
import Pagination from './Pagination';
import PokemonList from './PokemonList';
import useLocalStorage from '../hooks/useLocalStorage';
import usePokemonService from '../services/usePokemonService';

import type { IPokemonData } from '../types';

const SearchPanel = () => {
  const { page, pokemonName } = useParams();
  const currentPage = +(page ?? 1);
  const pageLimit = 10;
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState<IPokemonData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const { getAllPokemons, getPokemon } = usePokemonService();
  const { savedPokemon, savePokemon } = useLocalStorage();
  const inputValue = savedPokemon;

  const loadAllPokemons = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await getAllPokemons(currentPage);
      const lastPage = Math.ceil(data.count / pageLimit);

      if (currentPage > lastPage) {
        navigate('/page404', { replace: true });
        return;
      }

      setSearchResults(data.results);
      setTotalPages(lastPage);
    } catch (err) {
      console.error(`SearchPanel.loadAllPokemons() failed: ${err}`);
      navigate('/page404', { replace: true });
    } finally {
      setIsLoading(false);
    }
  }, [getAllPokemons, currentPage, navigate]);

  const searchPokemon = useCallback(
    async (e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.preventDefault();
      setIsLoading(true);

      try {
        if (!inputValue.trim()) {
          const allPokemons = await getAllPokemons(currentPage);
          console.log('Input is empty. Found Pokemons:', allPokemons.results);

          setSearchResults(allPokemons.results);
          setTotalPages(Math.ceil(allPokemons.count / pageLimit));
        } else {
          const pokemon = await getPokemon(inputValue);

          setSearchResults([pokemon]);
          setTotalPages(1);

          if (pokemon !== undefined) {
            console.log('Found Pokemon:', pokemon);
          }
        }
      } catch (err) {
        console.error(`SearchPanel searchPokemon() failed. ${err}`);
      } finally {
        setIsLoading(false);
      }
    },
    [inputValue, getAllPokemons, getPokemon, currentPage]
  );

  const loadStartData = useCallback(async () => {
    if (inputValue) {
      await searchPokemon();
    } else {
      await loadAllPokemons();
    }
  }, [inputValue, loadAllPokemons, searchPokemon]);

  useEffect(() => {
    if (!Number.isInteger(currentPage) || currentPage < 1) {
      navigate('/page404', { replace: true });
      return;
    }

    loadStartData();
  }, [currentPage, navigate, loadStartData]);

  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    savePokemon(event.target.value);
  };

  const changePage = (page: number) => {
    if (pokemonName) {
      navigate(`/${page}/${pokemonName}`);
    } else {
      navigate(`/${page}`);
    }
  };

  return (
    <div className="w-full p-8" data-testid="search-panel">
      <form className="form flex justify-center items-center w-2/3 mx-auto">
        <input
          className="input min-w-52 h-10 mr-2.5 border-r-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="text"
          placeholder="Enter Full Name or Id"
          onChange={(e) => onInputValueChange(e)}
          value={inputValue}
        />
        <button
          onClick={searchPokemon}
          className="btn h-10 text-white bg-gradient-to-r from-purple-500 to-pink-500
              hover:bg-gradient-to-l focus:ring-4 focus:outline-none
              focus:ring-purple-200 dark:focus:ring-purple-800
              font-medium rounded-lg text-xs
              px-4 py-2
              whitespace-nowrap"
        >
          Search Pokemon
        </button>
      </form>
      <h1 className="mb-4 mt-8 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">
        Pokemon Search Results
      </h1>
      <div className="search-results__title mb-8 flex justify-evenly">
        <h2 className="text-3xl font-extrabold text-gray-500">Pokemon</h2>
        <h2 className="text-3xl font-extrabold text-gray-500">Link to Data</h2>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PokemonList data={searchResults} currentPage={currentPage} />
          <Pagination page={currentPage} totalPages={totalPages} onPageChange={changePage} />
        </>
      )}
    </div>
  );
};

export default SearchPanel;
