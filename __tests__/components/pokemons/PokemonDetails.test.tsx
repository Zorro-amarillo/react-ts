import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { PokemonDetails } from '../../../src/components';
import store from '../../../src/shared/store';

describe('PokemonDetails', () => {
  it('should render Pokemon name', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/1/bulbasaur']}>
          <Routes>
            <Route path="/:page/:pokemonName" element={<PokemonDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText('Bulbasaur')).toBeInTheDocument();
  });
});
