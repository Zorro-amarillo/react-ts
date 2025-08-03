import { useState, useCallback, useEffect } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import usePagination from './usePagination';
import useLocalStorage from '../hooks/useLocalStorage';
import usePokemonService from '../services/usePokemonService';
import { PAGE_LIMIT } from '../utils/constants';

import type { IPokemonData } from '../utils/types';

const usePokemonSearch = () => {
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState<IPokemonData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { getAllPokemons, getPokemon } = usePokemonService();
  const { savedPokemon, savePokemon } = useLocalStorage();
  const { currentPage, changePage, totalPages, setTotalPages } = usePagination();
  const inputValue = savedPokemon;

  const loadAllPokemons = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await getAllPokemons(currentPage);
      const lastPage = Math.ceil(data.count / PAGE_LIMIT);

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
  }, [getAllPokemons, currentPage, setTotalPages, navigate]);

  const searchPokemon = useCallback(
    async (e?: MouseEvent<HTMLButtonElement>) => {
      e?.preventDefault();
      setIsLoading(true);

      try {
        if (!inputValue.trim()) {
          const allPokemons = await getAllPokemons(currentPage);
          console.log('Input is empty. Found Pokemons:', allPokemons.results);

          setSearchResults(allPokemons.results);
          setTotalPages(Math.ceil(allPokemons.count / PAGE_LIMIT));
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
    [inputValue, getAllPokemons, getPokemon, currentPage, setTotalPages]
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

  return {
    inputValue,
    searchResults,
    isLoading,
    totalPages,
    currentPage,
    onInputValueChange: (event: ChangeEvent<HTMLInputElement>) => {
      savePokemon(event.target.value);
    },
    changePage,
    searchPokemon,
  };
};

export default usePokemonSearch;
