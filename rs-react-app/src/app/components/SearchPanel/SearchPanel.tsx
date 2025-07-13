import { Component, type ChangeEvent } from 'react';
import PokemonService from '../../../services/PokemonService/PokemonService';
import PokemonList from '../PokemonList/PokemonList';

class SearchPanel extends Component {
  pokemonService = new PokemonService();

  state = {
    inputValue: '',
    searchResults: [],
    firstLoad: true,
  };

  render() {
    if (this.state.firstLoad) {
      this.loadAllPokemons();
    }

    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="Enter Pokemon's Full Name"
            onChange={(e) => this.onValueChange(e)}
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
      </div>
    );
  }

  async loadAllPokemons() {
    const data = await this.pokemonService.getAllPokemons();
    this.setState({
      searchResults: data.results,
      firstLoad: false,
    });
  }

  searchPokemon = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const { inputValue } = this.state;

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
        console.log('Found Pokemon:', pokemon);

        localStorage.setItem('lastPokemonSearch', inputValue.toLowerCase());
      }
    } catch (err) {
      console.error(`SearchPanel.searchPokemon error: ${err}`);
    }
  };

  onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: event.target.value,
    });
  };
}

export default SearchPanel;
