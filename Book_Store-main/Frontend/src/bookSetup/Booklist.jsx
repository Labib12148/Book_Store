import React, { useEffect, useState } from 'react';
import Book from './Book.jsx';
import './Booklist.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Make API call to get all books initially
    fetch('http://localhost:3001/api/books')
      .then(response => response.json())
      .then(data => {
        console.log('Books data from API:', data);
        setBooks(data);
      })
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleBookClick = async (book) => {
    navigate(`/books/${book.isbn}`);
  };

  return (
    <div className='Navbar'>
      <Navbar />
      <div className="book-list">
        {books.map((book) => (
          <div key={book.isbn} className="book-card" onClick={() => handleBookClick(book)}>
            <Book
              bookTitle={book.bookTitle}
              bookAuthor={book.bookAuthor}
              isbn={book.isbn}
              imageUrlM={book.imageUrlM}
              publisher={book.publisher}
              yearOfPublication={book.yearOfPublication}
              genre={book.genre}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
