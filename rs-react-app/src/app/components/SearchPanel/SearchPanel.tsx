import './SearchPanel.css';
import { Component, type ChangeEvent } from 'react';
import PokemonService from '../../services/PokemonService/PokemonService';
import PokemonList from '../PokemonList/PokemonList';
import Loader from '../Loader/Loader';

class SearchPanel extends Component {
  pokemonService = new PokemonService();

  state = {
    inputValue: localStorage.getItem('lastPokemonSearch') ?? '',
    searchResults: [],
    isLoading: false,
    isErrorBoundary: false,
  };

  render() {
    if (this.state.isErrorBoundary) {
      throw new Error('Special Error to Test ErrorBoundary');
    }

    const { isLoading, searchResults } = this.state;

    return (
      <div>
        <form className="form">
          <input
            className="input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="text"
            placeholder="Enter Full Name or Id"
            onChange={(e) => this.onInputValueChange(e)}
            value={this.state.inputValue}
          />
          <button
            onClick={this.searchPokemon}
            className="text-white bg-gradient-to-r from-purple-500 to-pink-500
             hover:bg-gradient-to-l focus:ring-4 focus:outline-none
             focus:ring-purple-200 dark:focus:ring-purple-800
             font-medium rounded-lg text-xs
             px-4 py-2
             whitespace-nowrap"
          >
            Search Pokemon
          </button>
        </form>
        <h1 className="mb-4 mt-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          Pokemon Search Results
        </h1>
        <div className="search-results__title">
          <h2 className="text-3xl font-extrabold text-gray-500">Pokemon</h2>
          <h2 className="text-3xl font-extrabold text-gray-500">
            Link to Pokemon JSON
          </h2>
        </div>
        {isLoading ? <Loader /> : <PokemonList data={searchResults} />}
        <button
          type="button"
          onClick={() =>
            this.setState({
              isErrorBoundary: true,
            })
          }
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Error Button
        </button>
      </div>
    );
  }

  componentDidMount(): void {
    this.loadStartData();
  }

  loadStartData = async () => {
    const { inputValue } = this.state;

    if (inputValue) {
      await this.searchPokemon();
    } else {
      this.loadAllPokemons();
    }
  };

  async loadAllPokemons() {
    this.setState({
      isLoading: true,
    });

    try {
      const data = await this.pokemonService.getAllPokemons();
      this.setState({
        searchResults: data.results,
        isLoading: false,
      });
    } catch (err) {
      this.setState({
        isLoading: false,
      });
      console.error(`SearchPanel.loadAllPokemons() failed: ${err}`);
    }
  }

  searchPokemon = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    this.setState({
      isLoading: true,
    });

    try {
      const { inputValue } = this.state;
      localStorage.setItem('lastPokemonSearch', inputValue.toLowerCase());

      if (!inputValue.trim()) {
        const allPokemons = await this.pokemonService.getAllPokemons();
        console.log('Input is empty. Found Pokemons:', allPokemons.results);

        this.setState({
          searchResults: allPokemons.results,
          isLoading: false,
        });
      } else {
        const pokemon = await this.pokemonService.getPokemon(inputValue);

        this.setState({
          searchResults: [pokemon],
          isLoading: false,
        });

        if (pokemon !== undefined) {
          console.log('Found Pokemon:', pokemon);
        }
      }
    } catch (err) {
      this.setState({
        isLoading: false,
      });
      console.error(`SearchPanel.searchPokemon() failed. ${err}`);
    }
  };

  onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: event.target.value,
    });
  };
}

export default SearchPanel;
