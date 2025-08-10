import {
  Loader,
  Pagination,
  PokemonList,
  SearchResultsHeader,
  SearchForm,
  ErrorMessage,
} from '../';
import { btnPrimaryStyle, ErrorText } from '../../shared/constants';
import usePokemonSearch from '../../shared/hooks/usePokemonSearch';

const SearchPanel = () => {
  const {
    savedPokemon: inputValue,
    searchResults,
    isLoading,
    totalPages,
    currentPage,
    onInputChange,
    onSearch,
    changePage,
    isErrorAllPokemons,
    isErrorPokemon,
    onClearCache,
  } = usePokemonSearch();

  return (
    <div className="w-full p-8" data-testid="search-panel">
      <SearchForm value={inputValue} onChange={onInputChange} onSearch={onSearch} />

      <SearchResultsHeader />
      {isLoading ? (
        <Loader />
      ) : isErrorAllPokemons ? (
        <ErrorMessage message={ErrorText.tryAgain} />
      ) : isErrorPokemon ? (
        <ErrorMessage message={ErrorText.enterName} />
      ) : (
        <>
          <PokemonList data={searchResults} currentPage={currentPage} />
          <Pagination page={currentPage} totalPages={totalPages} onPageChange={changePage} />
        </>
      )}

      <button className={`${btnPrimaryStyle} mt-8`} onClick={onClearCache}>
        Clear Cache
      </button>
    </div>
  );
};

export default SearchPanel;
