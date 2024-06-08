import React, { useState } from 'react';
import './SearchBar.css'; // Import the CSS file for styling

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    console.log(`Search query: ${query}`);
    // Implement search logic here
  };

  return (
    <div className="search-container">
      <div className="input-box">
        <input
          type="search"
          name="search-form"
          id="search-form"
          className="search-input"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions..."
          value={query}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default SearchBar;