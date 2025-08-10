import { useState, useCallback, useEffect } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import useLocalStorage from './useLocalStorage';
import usePagination from './usePagination';
import { useGetAllPokemonsQuery, useGetPokemonQuery } from '../api/pokemonApiSlice';
import { PAGE_LIMIT } from '../constants';

import type { IPokemonData } from '../types';

const usePokemonSearch = () => {
  const [searchResults, setSearchResults] = useState<IPokemonData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { savedPokemon, savePokemon } = useLocalStorage();
  const { currentPage, changePage, totalPages, setTotalPages } = usePagination();

  const allPokemonsResult = useGetAllPokemonsQuery(currentPage, {
    skip: !!savedPokemon,
  });
  const {
    data: allPokemonsData,
    isLoading: isLoadingAllPokemons,
    isFetching: isFetchingAllPokemons,
    isError: isErrorAllPokemons,
  } = allPokemonsResult;

  const pokemonResult = useGetPokemonQuery(savedPokemon, {
    skip: !savedPokemon,
  });
  const {
    data: pokemonsData,
    isLoading: isLoadingPokemon,
    isFetching: isFetchingPokemon,
    isError: isErrorPokemon,
  } = pokemonResult;

  useEffect(() => {
    if (!savedPokemon && allPokemonsData) {
      const lastPage = Math.ceil(allPokemonsData.count / PAGE_LIMIT);
      setSearchResults(allPokemonsData.results);
      setTotalPages(lastPage);
    }
  }, [allPokemonsData, savedPokemon, setTotalPages]);

  useEffect(() => {
    if (savedPokemon && pokemonsData) {
      setSearchResults([pokemonsData]);
      setTotalPages(1);
    }
  }, [pokemonsData, savedPokemon, setTotalPages]);

  useEffect(() => {
    if (!Number.isInteger(currentPage) || currentPage < 1) {
      navigate('/page404');
    }
  }, [currentPage, navigate]);

  useEffect(() => {
    if (isLoadingAllPokemons || isFetchingAllPokemons || isLoadingPokemon || isFetchingPokemon) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isFetchingAllPokemons, isFetchingPokemon, isLoadingAllPokemons, isLoadingPokemon]);

  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      savePokemon(inputValue);

      if (inputValue) {
        changePage(1);
      }
    },
    [savePokemon, changePage]
  );

  const onSearch = useCallback((e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
  }, []);

  return {
    savedPokemon,
    searchResults,
    isLoading,
    totalPages,
    currentPage,
    onInputChange,
    onSearch,
    changePage,
    isErrorAllPokemons,
    isErrorPokemon,
  };
};

export default usePokemonSearch;
