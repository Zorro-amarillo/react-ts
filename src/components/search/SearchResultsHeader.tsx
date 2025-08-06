const SearchResultsHeader = () => {
  return (
    <>
      <h1 className="mb-4 mt-8 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">
        Pokemon Search Results
      </h1>
      <div className="search-results__title mb-8 flex justify-evenly">
        <h2 className="text-3xl font-extrabold text-gray-500">Pokemon</h2>
        <h2 className="text-3xl font-extrabold text-gray-500">Link to Data</h2>
      </div>
    </>
  );
};

export default SearchResultsHeader;
