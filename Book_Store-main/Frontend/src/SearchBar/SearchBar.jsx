import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import './SearchBar.css';

const SearchBar = ({ books }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async (isbn) => {
      try {
        const response = await axios.get(`http://localhost:3001/api/books/${isbn}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching book details:', error);
        return null;
      }
    };

    const updateSuggestions = async () => {
      if (searchTerm.length > 0) {
        const filteredBooks = books.filter(
          (book) =>
            book.isbn.includes(searchTerm) ||
            book.bookTitle.toLowerCase().includes(searchTerm) ||
            book.bookAuthor.toLowerCase().includes(searchTerm)
        );

        const suggestionsWithDetails = await Promise.all(
          filteredBooks.slice(0, 3).map(async (book) => {
            const details = await fetchBookDetails(book.isbn);
            return { ...book, details };
          })
        );

        setSuggestions(suggestionsWithDetails);
      } else {
        setSuggestions([]);
      }
    };

    updateSuggestions();
  }, [searchTerm, books]);

  const handleBookClick = (book) => {
    navigate(`/books/${book.isbn}`);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handleIconClick = () => {
    if (suggestions.length > 0) {
      handleBookClick(suggestions[0]);
    }
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="search-icon-container">
          <IconButton onClick={handleIconClick} color="primary">
            <SearchIcon />
          </IconButton>
        </div>
      </div>
      {searchTerm.length > 0 && suggestions.length > 0 && (
        <div className="search-results">
          <div className="top-suggestions-box">
            {suggestions.map((book) => (
              <div
                key={book.isbn}
                className="search-result"
                onClick={() => handleBookClick(book)}
              >
                <img
                  src={book.details?.imageUrlM || 'placeholder-url'}
                  alt={book.bookTitle}
                  className="suggestion-image"
                />
                <p>
                  {book.details
                    ? `${book.details.bookTitle} - ${book.details.bookAuthor}`
                    : `${book.bookTitle} - ${book.bookAuthor}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
