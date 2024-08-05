import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-700 text-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-600 transition-colors duration-300"
      >
        ←
      </button>
      <span className="text-gray-300">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-700 text-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-600 transition-colors duration-300"
      >
        →
      </button>
    </div>
  );
};

export default Pagination;