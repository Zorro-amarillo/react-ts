import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import PokemonDetails from '../../src/components/PokemonDetails';

describe('PokemonDetails', () => {
  it('should render Pokemon name', async () => {
    render(
      <MemoryRouter initialEntries={['/1/bulbasaur']}>
        <Routes>
          <Route path="/:page/:pokemonName" element={<PokemonDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('Bulbasaur')).toBeInTheDocument();
  });
});
