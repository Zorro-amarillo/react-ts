import PokemonService from '../../src/app/services/PokemonService/PokemonService';

describe('PokemonService', () => {
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  const mockedFetch = vi.fn();

  beforeEach(() => {
    global.fetch = mockedFetch;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('getPokemonData should return data on successful request', async () => {
    const pokemonName = 'ditto';
    const mockedUrl = 'ditto-url';
    const mockedData = {
      results: [
        {
          name: pokemonName,
          url: mockedUrl,
        },
      ],
    };
    const mockedResponse = new Response(JSON.stringify(mockedData), {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    mockedFetch.mockResolvedValue(mockedResponse);

    const pokemonService = new PokemonService();
    const result = await pokemonService.getPokemonData(mockedUrl);

    expect(result).toEqual({
      results: [
        {
          name: pokemonName,
          url: mockedUrl,
        },
      ],
    });
    expect(mockedFetch).toHaveBeenCalledWith(mockedUrl);
  });

  it('getAllPokemons should fetch Pokemons', async () => {
    const mockedPage = 3;
    const mockedPageLimit = 20;
    const mockedOffset = (mockedPage - 1) * mockedPageLimit;
    const mockedData = {
      results: [
        { name: 'pikachu', url: 'pikachu-url' },
        { name: 'bulbasaur', url: 'bulbasaur-url' },
      ],
    };
    const mockedResponse = new Response(JSON.stringify(mockedData), {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    mockedFetch.mockResolvedValue(mockedResponse);

    const pokemonService = new PokemonService();
    const result = await pokemonService.getAllPokemons(mockedPage);

    expect(result).toEqual(mockedData);
    expect(mockedFetch).toHaveBeenCalledWith(
      `${baseUrl}?limit=${mockedPageLimit}&offset=${mockedOffset}`
    );
  });

  it('getPokemon should fetch Pokemon', async () => {
    const pokemonName = 'bulbasaur';
    const mockedUrl = `${baseUrl}/${pokemonName}`;
    const mockedData = {
      name: pokemonName,
      url: mockedUrl,
      id: 1,
    };
    const mockedResponse = new Response(JSON.stringify(mockedData), {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    mockedFetch.mockResolvedValue(mockedResponse);

    const pokemonService = new PokemonService();
    const result = await pokemonService.getPokemon(pokemonName);
    const updatedResult = {
      ...result,
      url: `${baseUrl}/${mockedData.id}`,
    };

    expect(result).toEqual(updatedResult);
    expect(mockedFetch).toHaveBeenCalledWith(mockedUrl);
  });
});
