import { Loader, Pagination, PokemonList, SearchResultsHeader, SearchForm } from '../index.ts';

import usePokemonSearch from '../../utils/hooks/usePokemonSearch.tsx';

const SearchPanel = () => {
  const {
    inputValue,
    searchResults,
    isLoading,
    totalPages,
    currentPage,
    onInputValueChange,
    changePage,
    searchPokemon,
  } = usePokemonSearch();

  return (
    <div className="w-full p-8" data-testid="search-panel">
      <SearchForm value={inputValue} onChange={onInputValueChange} onSearch={searchPokemon} />

      <SearchResultsHeader />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PokemonList data={searchResults} currentPage={currentPage} />
          <Pagination page={currentPage} totalPages={totalPages} onPageChange={changePage} />
        </>
      )}
    </div>
  );
};

export default SearchPanel;
