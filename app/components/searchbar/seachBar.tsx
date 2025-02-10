import React from 'react';

const SearchBar = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-md">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7FC0AA]"
      />
      {/* Browse Catalog Button */}
      <button
        className="w-full sm:w-auto bg-[#7FC0AA] text-black px-4 py-2 rounded-md font-semibold hover:bg-[#6BAE99] transition-colors"
      >
        Browse Catalog
      </button>
    </div>
  );
};

export default SearchBar;