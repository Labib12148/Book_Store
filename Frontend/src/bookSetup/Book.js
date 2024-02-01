import React from 'react';
import './Book.css';
// Import Materialize CSS only once in your main file (App.js or index.js)
// Removed Materialize JavaScript import as we don't need it here

const Book = ({ bookTitle, bookAuthor, imageUrlM, }) => {
  // console.log("In Book.js: ", bookTitle);
  return (
    <div className="book">
      <img src={imageUrlM} alt={bookTitle} className="book-image" />
      <h2 className="book-title">{bookTitle}</h2>
      <p className="book-author">{bookAuthor}</p>
    </div>

  );
};

export default Book;
