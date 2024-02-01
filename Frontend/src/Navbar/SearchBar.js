import React, { useState } from 'react';
import {IconButton,TextField, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import './SearchBar.css'


const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Call the onSearch prop with the search term
    onSearch(searchTerm);

  };

  return (
    <div className="searchContainer">
      <TextField
        className="searchInput"
        label="Search Books"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <Button onClick={handleSearch}>
      <IconButton
        type="button"
        className="iconButton"
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      </Button>
    </div>
  );
};

export default SearchBar;
