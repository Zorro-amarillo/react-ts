import { render, screen } from '@testing-library/react';
import PokemonList from '../../src/app/components/PokemonList/PokemonList';
import { renderWithRouter } from '../test-utils/test-utils';

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
    renderWithRouter(<PokemonList data={mockData} currentPage={3} />);

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(mockData.length);

    mockData.forEach((pokemon) => {
      const { name } = pokemon;
      const pokemonName = `${name[0].toUpperCase()}${name.slice(1)}`;

      expect(screen.getByText(pokemonName)).toBeInTheDocument();
    });
  });

  it('should render one Pokemon, when there is only one Pokemon in the provided data', () => {
    const mockData = [{ name: 'pikachu', url: 'pikachu-url' }];
    const { container } = renderWithRouter(
      <PokemonList data={mockData} currentPage={3} />
    );

    const list = container.querySelector('ul');
    expect(list?.children).toHaveLength(mockData.length);

    const name = screen.getByText('Pikachu');
    expect(name).toBeInTheDocument();

    const link = screen.getByText(mockData[0]['url']);
    expect(link).toBeInTheDocument();
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
