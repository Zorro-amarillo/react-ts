import { configureStore } from '@reduxjs/toolkit';

import { pokemonApiSlice } from '@/shared/api/pokemonApiSlice';

const store = configureStore({
  reducer: {
    [pokemonApiSlice.reducerPath]: pokemonApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(pokemonApiSlice.middleware);
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
