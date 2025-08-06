import { hookResult, mockedFetch } from '../test-utils/test-utils';
import { BASE_URL } from '../../src/shared/constants';

describe('usePokemonService', () => {
  beforeEach(() => {
    global.fetch = mockedFetch;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('getPokemonData should return data on successful request', async () => {
    const { getPokemonData } = hookResult;

    const pokemonName = 'ditto';
    const mockedUrl = `${pokemonName}-url`;
    const mockedData = {
      results: [
        {
          name: pokemonName,
          url: mockedUrl,
        },
      ],
    };
    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => mockedData,
    });

    const data = await getPokemonData(mockedUrl);
    expect(data).toEqual(mockedData);
    expect(mockedFetch).toHaveBeenCalledWith(mockedUrl);
  });

  it('getAllPokemons should fetch Pokemons', async () => {
    const { getAllPokemons } = hookResult;

    const mockedPage = 3;
    const mockedPageLimit = 10;
    const mockedOffset = (mockedPage - 1) * mockedPageLimit;
    const mockedData = {
      results: [
        { name: 'pikachu', url: 'pikachu-url' },
        { name: 'bulbasaur', url: 'bulbasaur-url' },
      ],
    };
    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => mockedData,
    });

    const data = await getAllPokemons(mockedPage);

    expect(data).toEqual(mockedData);
    expect(mockedFetch).toHaveBeenCalledWith(
      `${BASE_URL}?limit=${mockedPageLimit}&offset=${mockedOffset}`
    );
  });

  it('getPokemon should fetch Pokemon', async () => {
    const { getPokemon } = hookResult;

    const pokemonName = 'bulbasaur';
    const pokemonId = 1;
    const mockedUrl = `${BASE_URL}/${pokemonName}`;
    const mockedData = {
      name: pokemonName,
      url: mockedUrl,
      id: pokemonId,
    };
    const expectedData = {
      ...mockedData,
      url: `${BASE_URL}/${pokemonId}`,
    };
    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => mockedData,
    });

    const data = await getPokemon(pokemonName);
    expect(data).toEqual(expectedData);
    expect(mockedFetch).toHaveBeenCalledWith(mockedUrl);
  });
});
