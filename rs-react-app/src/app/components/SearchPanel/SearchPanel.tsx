import './SearchPanel.css';
import { Component, type ChangeEvent, type MouseEvent } from 'react';
import PokemonService from '../../../services/PokemonService/PokemonService';
import PokemonList from '../PokemonList/PokemonList';

class SearchPanel extends Component {
  pokemonService = new PokemonService();

  state = {
    inputValue: localStorage.getItem('lastPokemonSearch') ?? '',
    searchResults: [],
  };

  render() {
    return (
      <div>
        <form className="form">
          <input
            className="input"
            type="text"
            placeholder="Enter Full Name or Id"
            onChange={(e) => this.onInputValueChange(e)}
            value={this.state.inputValue}
          />
          <button onClick={this.searchPokemon}>Search Pokemon</button>
        </form>
        <h1>Pokemon Search Results</h1>
        <div className="search-results__title">
          <h2>Pokemon</h2>
          <h2>Link to Pokemon JSON</h2>
        </div>
        <PokemonList data={this.state.searchResults} />
        <button type="button" onClick={this.onErrorBtnClick}>
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
    const data = await this.pokemonService.getAllPokemons();
    this.setState({
      searchResults: data.results,
    });
  }

  searchPokemon = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();

    try {
      const { inputValue } = this.state;
      localStorage.setItem('lastPokemonSearch', inputValue.toLowerCase());

      if (!inputValue.trim()) {
        const allPokemons = await this.pokemonService.getAllPokemons();
        console.log('Input is empty. Found Pokemons:', allPokemons.results);

        this.setState({
          searchResults: allPokemons.results,
        });
      } else {
        const pokemon = await this.pokemonService.getPokemon(inputValue);

        this.setState({
          searchResults: [pokemon],
        });

        if (pokemon !== undefined) {
          console.log('Found Pokemon:', pokemon);
        }
      }
    } catch (err) {
      console.error(`SearchPanel.searchPokemon() failed. ${err}`);
    }
  };

  onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  onErrorBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    this.setState(
      {
        inputValue: 'pika',
      },
      () => {
        this.searchPokemon(e);
        this.pokemonService.getPokemon(this.state.inputValue);
      }
    );
  };
}

export default SearchPanel;
