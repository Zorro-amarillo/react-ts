import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import { PokemonDetails } from '../../../src/components';
import store from '../../../src/shared/store';
import { renderWithRouter } from '../../test-utils/test-utils';

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

  it('should show error when there is no Pokemon name', () => {
    renderWithRouter(<PokemonDetails />);

    expect(screen.getByText(/invalid pokemon name/i)).toBeInTheDocument();
  });
});
