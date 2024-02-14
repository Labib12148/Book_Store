// Rate.js
import React, { useState } from 'react';
import StarRating from 'react-rating-stars-component';
import axios from 'axios';
import './Rate.css';

const Rate = ({ bookIsbn }) => {
  const [rating, setRating] = useState(0);

  const handleRatingSubmit = async () => {
    try {
      // Make an API call to submit the rating
      await axios.post('http://localhost:3001/api/ratings', { isbn: bookIsbn, rating });
      console.log(bookIsbn, rating + `HELLO`);
      // Optionally, you can update the UI or show a success message
      alert('Rating submitted successfully!');
      // Clear the rating
      setRating(0);
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <div className="rate-container">
      <div className="rate-header">Rate this Book</div>
      <div className="rate-stars">
        <StarRating
          count={5}
          size={30}
          value={rating}
          isHalf={true}
          onChange={(newRating) => setRating(newRating)}
        />
      </div>
      <button type="button" className="rate-submit" onClick={handleRatingSubmit}>
        Submit Rating
      </button>
    </div>
  );
};

export default Rate;
