'use client';

import type { ChangeEvent, MouseEvent } from 'react';

import { btnPrimaryStyle } from '@/shared/constants';

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
      <button onClick={onSearch} className={btnPrimaryStyle}>
        Search Pokemon
      </button>
    </form>
  );
};

export default SearchForm;
