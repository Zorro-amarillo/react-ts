import { render, screen } from '@testing-library/react';
import Pokemon from '../../src/app/components/Pokemon/Pokemon';

describe('Pokemon', () => {
  const mockedData = {
    name: 'Pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25',
  };

  it('should render Pokemon name', () => {
    render(<Pokemon pokemonData={mockedData} />);

    const name = screen.getByRole('paragraph');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Pikachu');
  });

  it('should render link to Pokemon JSON', () => {
    render(<Pokemon pokemonData={mockedData} />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', mockedData.url);
  });
});
