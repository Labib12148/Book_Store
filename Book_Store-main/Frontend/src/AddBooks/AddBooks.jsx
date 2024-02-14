import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, Paper, makeStyles, createTheme, ThemeProvider, Snackbar } from '@material-ui/core';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Alert } from '@material-ui/lab'; // Import Alert from @material-ui/lab
import axios from 'axios';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const AddBooks = () => {
  const classes = useStyles();
  const [bookData, setBookData] = useState({
    bookTitle: '',
    bookAuthor: '',
    yearOfPublication: '',
    publisher: '',
    imageUrlM: '',
    genre: '',
    description: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/author', bookData);
      setAlertSeverity('success');
      setAlertMessage('Book added successfully');
      setOpenSnackbar(true);

      // Reset form fields after successful submission
      setBookData({
        bookTitle: '',
        bookAuthor: '',
        yearOfPublication: '',
        publisher: '',
        imageUrlM: '',
        genre: '',
        description: ''
      });
    } catch (error) {
      setAlertSeverity('error');
      setAlertMessage('Error adding book');
      setOpenSnackbar(true);
      console.error('Error adding book:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Paper className={classes.paper}>
          <Typography variant="h4" gutterBottom>
            Add a New Book
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Book Title"
                  name="bookTitle"
                  value={bookData.bookTitle}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Book Author"
                  name="bookAuthor"
                  value={bookData.bookAuthor}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Year of Publication"
                  name="yearOfPublication"
                  value={bookData.yearOfPublication}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Publisher"
                  name="publisher"
                  value={bookData.publisher}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  name="imageUrlM"
                  value={bookData.imageUrlM}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Genre"
                  name="genre"
                  value={bookData.genre}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={bookData.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  required
                />
              </Grid>
              <Grid item xs={12} className={classes.submitButton}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddCircleOutlineIcon />}
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default AddBooks;
