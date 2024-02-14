import React from 'react';
import './Book.css';


const Book = ({ bookTitle, bookAuthor, imageUrlM, }) => {
  return (
    <div className="book">
      <img src={imageUrlM} alt={bookTitle} className="book-image" />
      <h2 className="book-title">{bookTitle}</h2>
      <p className="book-author">{bookAuthor}</p>
    </div>

  );
};

export default Book;
