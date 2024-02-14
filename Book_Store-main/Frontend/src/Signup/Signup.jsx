import React from 'react';
import { Button, Container, Paper, makeStyles, createTheme, ThemeProvider } from '@material-ui/core';
import bannerImage from '../assets/imgs/Banner.jpg';
import SignupNavbar from '../Navbar/SignupNavbar.jsx'
import { useNavigate } from 'react-router-dom';

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
  button: {
    margin: theme.spacing(2, 0),
    borderRadius: theme.spacing(2),
  },
}));

const StartPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleUserSignup = () => {
    navigate('/signup/user');
  };

  const handleAuthorSignup = () => {
    navigate('/signup/author');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className={classes.root}>
        <div>
          <SignupNavbar />
        </div>
        <div className={classes.image}>
          <img src={bannerImage} alt="Banner" className={classes.image} />
        </div>
        <Paper className={classes.paper} elevation={3}>
          <Button
            className={classes.button}
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleUserSignup}
          >
            Signup as User
          </Button>
          <Button
            className={classes.button}
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleAuthorSignup}
          >
            Signup as Author
          </Button>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default StartPage;