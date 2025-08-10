import type { IPaginationProps } from '../shared/types';

const Pagination = ({ page, totalPages, onPageChange }: IPaginationProps) => {
  return (
    <div className="pages flex justify-center mt-8 gap-2">
      <button
        onClick={() => {
          if (page > 1) {
            onPageChange(page - 1);
          }
        }}
        className={`${
          page === 1
            ? 'cursor-not-allowed text-gray-500'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-300'
        }`}
      >
        {'<'}
      </button>
      <span className="text-gray-500">{`Page ${page} of ${totalPages}`}</span>
      <button
        onClick={() => {
          if (page < totalPages) {
            onPageChange(page + 1);
          }
        }}
        className={`${
          page === totalPages
            ? 'cursor-not-allowed bg-gray-100 text-gray-500'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-300'
        }`}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
