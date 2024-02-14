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
import { AccountCircle, Lock } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import LoginNavbar from '../Navbar/LoginNavbar.jsx'
import bannerImage from '../assets/imgs/Banner2.jpg';

const theme = createTheme({
  palette: {
    primary: {
      main: '#82B8D6',
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
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 'auto',
    height: 'auto',
  },
  paper: {
    padding: theme.spacing(4),
    width: '100%',
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

const LoginUser = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
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

  const handleLogin = async () => {
    if (!formData.username || !formData.password) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Username and Password are mandatory fields');
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSnackbarSeverity('success');
        setSnackbarMessage('Login successful!');
        setOpenSnackbar(true);

        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          console.error('Error logging in:', errorData.message);
          setSnackbarSeverity('error');
          setSnackbarMessage('Incorrect Username or Password');
          setOpenSnackbar(true);
        } else {
          console.error('Error logging in:', response.statusText);
          setSnackbarSeverity('error');
          setSnackbarMessage('An error occurred. Please try again.');
          setOpenSnackbar(true);
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('An unexpected error occurred. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className={classes.root}>
        <div>
        <LoginNavbar />
        </div>
        <div className={classes.image}>
          <img src={bannerImage} alt="Banner" className={classes.image} />
        </div>
        <Paper className={classes.paper} elevation={3}>
          <AccountCircle fontSize="large" color="primary" />
          <Typography component="h1" variant="h5">
            Login to BOIKHATA
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              className={classes.inputField}
              InputProps={{
                startAdornment: <AccountCircle />,
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
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
              onClick={handleLogin}
            >
              Log In
            </Button>
          </form>
        </Paper>
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
      </Container>
    </ThemeProvider>
  );
};

export default LoginUser;
