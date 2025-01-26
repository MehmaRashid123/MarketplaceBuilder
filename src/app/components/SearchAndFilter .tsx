"use client";

import React, { useState } from "react";

interface SearchAndFilterProps {
  categories: string[];
  onSearch: (query: string) => void;
  onFilter: (category: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ categories, onSearch, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-yellow-500"
      />

      {/* Filter Dropdown */}
      <select
        onChange={(e) => onFilter(e.target.value)}
        className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-yellow-500"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchAndFilter;
