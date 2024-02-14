import React from 'react';
import StarRatings from 'react-star-ratings';
import './RatingStars.css'

const RatingStars = ({ rating }) => {
  const integerPart = Math.floor(rating);
  const decimalPart = rating - integerPart;
  const lastStarPercentage = Math.round(decimalPart * 100);

  return (
    <div className="rating-stars" style={{ width: `${lastStarPercentage}%` }}>
    <StarRatings
        rating={rating}
        starRatedColor="#FFBA5A"
        starEmptyColor="#e1e1e1"
        starDimension="30px"
        starSpacing="1px"
        numberOfStars={5}
        name="rating"
      />
     
    </div>
  );
};

export default RatingStars;
