
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RatingStars from './RatingStars';
import './SingleBook.css';
import Navbar from '../Navbar/Navbar';

const SingleBook = () => {
  const [book, setBook] = useState(null);
  const [averageRating, setAverageRating] = useState(null); // New state for average rating
  const { isbn } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/books/${isbn}`);
        setBook(response.data);

        // Fetch average rating for the book
        const averageRatingResponse = await axios.get(`http://localhost:3001/api/books/averageRating/${isbn}`);
        setAverageRating(averageRatingResponse.data.averageRating);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBook();
  }, [isbn]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div><Navbar />
    <div className="single-book-container">
      <div className="left-side">
        <div><img src={book.imageUrlM} alt={book.bookTitle} className="book-image" /></div>
        <div className="user-review">{/* Render user's review here */}</div>
      </div>
      <div className="center-side">
        <div className="book-details">
        <div className="book-title-rating">
        <h1>{book.bookTitle}</h1>
        <div className='rating'>
        {averageRating !== null && <RatingStars rating={averageRating} />}
        {averageRating !== null && averageRating.toFixed(1)}
        </div>
        </div>
          <p>Author: {book.bookAuthor}</p>
          <p>Publisher: {book.publisher}</p>
          <p>Year: {book.yearOfPublication}</p>
          <p>Genre: {book.genre}</p>
          <p>Description: {book.description}</p>
          {/* Add more details as needed */}
        </div>
      </div>
    </div>
    </div>
  );
};

export default SingleBook;
