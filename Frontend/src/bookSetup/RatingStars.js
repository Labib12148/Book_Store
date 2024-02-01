import React from 'react';
import { FaStar, FaStarHalf } from 'react-icons/fa';

const RatingStars = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span key={index}>
      {index + 1 <= rating ? (
        <FaStar size={25} color="#FFBA5A" />
      ) : index < rating ? (
        <FaStarHalf size={25} color="#FFBA5A" />
      ) : (
        <FaStar size={25} color="#a9a9a9" />
      )}
    </span>
  ));

  return <div className="rating-stars">{stars}</div>;
};

export default RatingStars;
