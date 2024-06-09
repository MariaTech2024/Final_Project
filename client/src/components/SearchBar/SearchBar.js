import React, { useState } from 'react';
import './SearchBar.css'; 

const SearchBar = () => {
  // useState hook to manage the state of the search query input
  const [query, setQuery] = useState('');

  // Function to handle the search action
  const handleSearch = () => {
    // Log the current search query to the console
    //console.log(`Search query: ${query}`);
    // You can add more functionality here such as calling an API with the search query
  };

  return (
    <div className="search-container">
      <div className="input-box">
        {/* Search input field */}
        <input
          type="search" // Input type is search for semantic purposes
          name="search-form" // Name attribute for the input field
          id="search-form" 
          className="search-input" // CSS class for styling the input
          onChange={(e) => setQuery(e.target.value)} // Event handler to update query state on input change
          placeholder="Search questions..." // Placeholder text for the input field
          value={query} // Bind input value to query state
        />
        {/* Search button */}
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;