import React from 'react';

function Footer({ currentPage, totalPages, onPageChange }) {
  return (
    <footer className="bg-white shadow-md mt-8">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div>Page {currentPage} of {totalPages}</div>
          <div className="space-x-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              &larr; Previous
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;