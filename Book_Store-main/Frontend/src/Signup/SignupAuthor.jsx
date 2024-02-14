import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  makeStyles,
  Snackbar,
  createTheme,
  ThemeProvider,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { AccountCircle, Email, Lock } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import SignupNavbar from '../Navbar/SignupNavbar.jsx'
import bannerImage from '../assets/imgs/Banner.jpg';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E09494',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '90vh',
  },
  image: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: "auto",
    height: "auto",
  },
  paper: {
    padding: theme.spacing(4),
    width: 'auto',
    maxWidth: '400px',
    backgroundColor: '#DEEFFF',
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[5],
    position: 'relative',
    zIndex: 1, 
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
  inputField: {
    margin: theme.spacing(1, 0),
  },
  button: {
    margin: theme.spacing(2, 0),
    borderRadius: theme.spacing(2),
  },
}));

const SignupAuthor = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bookAuthor: '',
    Email: '',
    Password: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async () => {
    if (!formData.bookAuthor || !formData.Password || !formData.Email) {
      setSnackbarMessage('bookAuthor, Email, and Password are mandatory');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    // Password requirements check
    if (formData.Password.length < 8 || !/[a-zA-Z]/.test(formData.Password) || !/\d/.test(formData.Password)) {
      setSnackbarMessage(
        'Password must be at least 8 characters long and contain a mix of letters and numbers'
      );
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/signup/author', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSnackbarSeverity('success');
        setSnackbarMessage('Signup successful!');
        setOpenSnackbar(true);

        // Delay navigation to the login page after showing the success alert
        setTimeout(() => {
          navigate('/login/author');
        }, 500);
      } else {
        const errorData = await response.json();
        console.error('Error signing up:', errorData.error);
        setSnackbarSeverity('error');
        setSnackbarMessage('bookAuthor already exists or there was an error. Please try again.');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Error signing up. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    // Apply overflow: hidden to the body when the component mounts
    document.body.style.overflow = 'hidden';
    return () => {
      // Reset overflow when the component unmounts
      document.body.style.overflow = 'visible';
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
          <SignupNavbar />
        </div>
      <div className={classes.root}>
        <img src={bannerImage} alt="Banner" className={classes.image} />
        <Container component="main" maxWidth="xs">
          <Paper className={classes.paper} elevation={3}>
            <AccountCircle fontSize="large" color="primary" />
            <Typography component="h1" variant="h5">
              Author Sign Up to BOIKHATA
            </Typography>
            <form className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="bookAuthor"
                label="Author Name"
                name="bookAuthor"
                autoComplete="bookAuthor"
                autoFocus
                value={formData.bookAuthor}
                onChange={handleChange}
                className={classes.inputField}
                InputProps={{
                  startAdornment: <AccountCircle />,
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="Email"
                label="Email"
                name="Email"
                autoComplete="Email"
                value={formData.Email}
                onChange={handleChange}
                className={classes.inputField}
                InputProps={{
                  startAdornment: <Email />,
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Password"
                label="Password"
                name="Password"
                type="password"
                autoComplete="new-password"
                value={formData.Password}
                onChange={handleChange}
                className={classes.inputField}
                InputProps={{
                  startAdornment: <Lock />,
                }}
              />
              <Button
                className={classes.button}
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
            </form>
          </Paper>
        </Container>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
};

export default SignupAuthor;
