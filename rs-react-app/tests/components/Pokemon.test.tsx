import { screen } from '@testing-library/react';

import Pokemon from '../../src/app/components/Pokemon/Pokemon';
import { renderWithRouter } from '../test-utils/test-utils';

describe('Pokemon', () => {
  const mockedData = {
    pokemonData: {
      name: 'Pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
    },
    page: 3,
  };

  const { pokemonData } = mockedData;

  it('should render Pokemon name', () => {
    renderWithRouter(<Pokemon {...mockedData} />);

    const name = screen.getByText(pokemonData.name);
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Pikachu');
  });

  it('should render link to Pokemon JSON', () => {
    renderWithRouter(<Pokemon {...mockedData} />);

    const link = screen.getByText(mockedData.pokemonData.url);
    expect(link).toBeInTheDocument();
  });
});
