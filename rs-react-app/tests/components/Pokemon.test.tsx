import { render, screen } from '@testing-library/react';
import Pokemon from '../../src/app/components/Pokemon/Pokemon';

describe('Pokemon', () => {
  it('should render Pokemon name', () => {
    render(
      <Pokemon
        pokemonData={{
          name: 'Pikachu',
          url: 'https://pokeapi.co/api/v2/pokemon/25',
        }}
      />
    );

    const name = screen.getByRole('paragraph');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Pikachu');
  });

  it('should render link to Pokemon JSON', () => {
    render(
      <Pokemon
        pokemonData={{
          name: 'Pikachu',
          url: 'https://pokeapi.co/api/v2/pokemon/25',
        }}
      />
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      'href',
      'https://pokeapi.co/api/v2/pokemon/25'
    );
  });
});
