import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PokemonDetails from '../../src/app/components/PokemonDetails/PokemonDetails';
import { Routes, Route } from 'react-router-dom';

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
