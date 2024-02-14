import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RatingStars from '../RatingStars/RatingStars';
import Navbar from '../Navbar/Navbar';
import Review from '../Review/Review';
import Rate from '../Rating/Rate';
import './SingleBook.css';

const SingleBook = () => {
  const [book, setBook] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { isbn } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch book details
        const bookResponse = await axios.get(`http://localhost:3001/api/books/${isbn}`);
        setBook(bookResponse.data);

        // Fetch average rating
        const averageRatingResponse = await axios.get(`http://localhost:3001/api/books/averageRating/${isbn}`);
        const fetchedAverageRating = averageRatingResponse.data.averageRating;
        console.log('Fetched Average Rating:', fetchedAverageRating);

        setAverageRating(fetchedAverageRating);

        // Fetch user reviews
        const reviewsResponse = await axios.get(`http://localhost:3001/api/reviews/${isbn}`);
        setReviews(reviewsResponse.data.reviews);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isbn]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="single-book-container">
        <div className="left-side">
          <div>
            <img src={book.imageUrlM} alt={book.bookTitle} className="book-image" />
          </div>
          <div className="user-rating">
            <Rate bookIsbn={isbn} />
          </div>
        </div>
        <div className="center-side">
        <div className="book-title">
        <h1>{book.bookTitle}</h1>
        <div className='rating'>
        {averageRating !== null && <RatingStars rating={averageRating} />}
        {averageRating !== null && averageRating.toFixed(1)} /5
        </div>
        </div>
        <div className="book-details">
            <p>Author: {book.bookAuthor}</p>
            <p>Publisher: {book.publisher}</p>
            <p>Year: {book.yearOfPublication}</p>
            <p>Genre: {book.genre}</p>
            <p>Description: {book.description}</p>
            <div className="user-review">
              <Review bookIsbn={isbn} />
              {reviews.length > 0 && (
                <div>
                  <h2>User Reviews:</h2>
                  <ul>
                    {reviews.map((review, index) => (
                      <li key={index}>
                        <strong>{review.User_Name}:</strong> {review.Review}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
