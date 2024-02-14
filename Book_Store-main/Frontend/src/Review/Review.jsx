import React, { useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './Review.css';

const Review = ({ bookIsbn }) => {
  const [reviewText, setReviewText] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleReviewSubmit = async () => {
    try {
      // Make an API call to submit the review
      await axios.post('http://localhost:3001/api/reviews', { isbn: bookIsbn, review: reviewText });

      console.log(bookIsbn, reviewText)
      // Optionally, you can update the UI or show a success message
      handleSnackbarOpen('Review submitted successfully!', 'success');
      // Clear the review text
      setReviewText('');
    } catch (error) {
      console.error('Error submitting review:', error);
      // Optionally, you can show an error message to the user
      handleSnackbarOpen('Error submitting review. Please try again.', 'error');
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  return (
    <div className="review-container">
      <div className="review-header">Share Your Review</div>
      <form className="review-form">
        <textarea
          className="review-textarea"
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <button type="button" className="review-submit" onClick={handleReviewSubmit}>
          Submit Review
        </button>
      </form>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Review;
