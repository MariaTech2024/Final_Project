import React, { useEffect, useState, useRef } from 'react';
import './SearchBar.css'; // Import the CSS file for styling

const SearchBar = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility
  const searchContainerRef = useRef(null); // Ref to the search container

  useEffect(() => {
    fetchData();
    document.addEventListener('click', handleClickOutside); // Add event listener on component mount
    return () => {
      document.removeEventListener('click', handleClickOutside); // Remove event listener on component unmount
    };
  }, []);

  const fetchData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((d) => setData(d));
  };

  const handleSearch = () => {
    const searchQuery = query.toLowerCase();
    const results = data.filter((dataObj) =>
      Object.values(dataObj).some(
        (value) => value.toString().toLowerCase().includes(searchQuery)
      )
    );
    setSearchResults(results);
    setShowDropdown(true); // Show dropdown when search is triggered
  };

  const handleDropdownItemClick = () => {
    // Hide dropdown when a search result is clicked
    setShowDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
      // If click is outside of the search container, hide the dropdown
      setShowDropdown(false);
    }
  };

  return (
    <div className="search-container" ref={searchContainerRef}>
      <div className="input-box">
        <input
          type="search"
          name="search-form"
          id="search-form"
          className="search-input"
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)} // Show dropdown when input is focused
          placeholder="Search questions..."
          value={query}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      {showDropdown && (
        <div className="search-results">
          {searchResults.length > 0 ? (
            <ul className="dropdown-menu">
              {searchResults.map((dataObj) => (
                <li className="dropdown-item" key={dataObj.id} onClick={handleDropdownItemClick}>
                  <div className="box">
                    <div className="card">
                      <div className="category">@{dataObj.username} </div>
                      <div className="heading">
                        {dataObj.name}
                        <div className="author">{dataObj.email}</div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-results">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;