import { render, screen } from '@testing-library/react';
import PokemonList from '../../src/app/components/PokemonList/PokemonList';

describe('PokemonList', () => {
  it('should render correct number of Pokemons, when there are more than one Pokemon in the provided data', () => {
    const mockData = [
      {
        name: 'pikachu',
        url: 'pikachu-url',
      },
      {
        name: 'ditto',
        url: 'ditto-url',
      },
    ];
    const { container } = render(<PokemonList data={mockData} />);

    const list = container.querySelector('ul');
    expect(list?.children).toHaveLength(mockData.length);

    mockData.forEach((pokemon) => {
      const { name } = pokemon;
      const pokemonName = `${name[0].toUpperCase()}${name.slice(1)}`;

      expect(screen.getByText(pokemonName)).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: pokemon.url })
      ).toBeInTheDocument();
    });
  });

  it('should render one Pokemon, when there is only one Pokemon in the provided data', () => {
    const mockData = [{ name: 'pikachu', url: 'pikachu-url' }];
    const { container } = render(<PokemonList data={mockData} />);

    const list = container.querySelector('ul');
    expect(list?.children).toHaveLength(mockData.length);

    const name = screen.getByText('Pikachu');
    expect(name).toBeInTheDocument();

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', mockData[0]['url']);
  });

  it('should not crash when receiving unexpected empty array', () => {
    render(<PokemonList data={[]} />);

    const list = screen.getByRole('list');

    expect(list).toBeInTheDocument();
    expect(list).toBeEmptyDOMElement();
  });

  it('should render error message for invalid Pokemon data', () => {
    const mockedData = [null];

    render(<PokemonList data={mockedData} />);

    expect(screen.getByText('⚠️ Invalid Pokemon Data ⚠️')).toBeInTheDocument();
    expect(
      screen.getByText('Please Enter Full Name or Id')
    ).toBeInTheDocument();
  });
});
