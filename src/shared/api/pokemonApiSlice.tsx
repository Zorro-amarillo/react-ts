import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL, PAGE_LIMIT } from '../constants';

export const pokemonApiSlice = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getAllPokemons: build.query({
      query: (page) => `?limit=${PAGE_LIMIT}&offset=${(page - 1) * PAGE_LIMIT}`,
    }),
    getPokemon: build.query({
      query: (pokemonName) => `/${pokemonName}`,
    }),
  }),
});

export const { useGetAllPokemonsQuery, useGetPokemonQuery } = pokemonApiSlice;
