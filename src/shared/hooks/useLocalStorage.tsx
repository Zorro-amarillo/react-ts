'use client';

import { useState } from 'react';

const useLocalStorage = () => {
  const [savedPokemon, setSavedPokemon] = useState(
    () => localStorage.getItem('lastPokemonSearch') ?? ''
  );

  const savePokemon = (input: string) => {
    setSavedPokemon(() => input);
    localStorage.setItem('lastPokemonSearch', input);
  };

  return { savedPokemon, savePokemon };
};

export default useLocalStorage;
