import type { ChangeEvent, MouseEvent } from 'react';

const SearchForm = ({
  value,
  onChange,
  onSearch,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e?: MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <form className="form flex justify-center items-center w-2/3 mx-auto">
      <input
        className="input min-w-52 h-10 mr-2.5 border-r-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        type="text"
        placeholder="Enter Full Name or Id"
        onChange={onChange}
        value={value}
      />
      <button
        onClick={onSearch}
        className="btn h-10 text-white bg-gradient-to-r from-purple-500 to-pink-500
              hover:bg-gradient-to-l focus:ring-4 focus:outline-none
              focus:ring-purple-200 dark:focus:ring-purple-800
              font-medium rounded-lg text-xs
              px-4 py-2
              whitespace-nowrap"
      >
        Search Pokemon
      </button>
    </form>
  );
};

export default SearchForm;
