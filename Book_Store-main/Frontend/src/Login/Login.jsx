import React from 'react';
import { Button, Container, Paper, makeStyles, createTheme, ThemeProvider } from '@material-ui/core';
import bannerImage from '../assets/imgs/Banner2.jpg';
import LoginNavbar from '../Navbar/LoginNavbar.jsx'
import { useNavigate } from 'react-router-dom';

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

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleUserLogin = () => {
    navigate('/login/user');
  };

  const handleAuthorLogin = () => {
    navigate('/login/author');
  };

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
          <Button
            className={classes.button}
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleUserLogin}
          >
            Login as User
          </Button>
          <Button
            className={classes.button}
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleAuthorLogin}
          >
            Login as Author
          </Button>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
