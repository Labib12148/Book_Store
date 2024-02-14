import React from 'react';
import { Link } from 'react-router-dom';
import MainPageNavbar from '../Navbar/MainPageNavbar.jsx';
import bookImage from "../assets/imgs/Books.jpg"
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './MainPage.css';

const useStyles = makeStyles((theme) => ({
  mainPage: {
    position: 'relative',
    overflow: 'hidden',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  mainContent: {
    position: 'relative',
    zIndex: 1,
    width:'auto',
    maxWidth: '90%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
    textAlign: 'center',
  },
  textContent: {
    fontFamily: 'Arial',
    backgroundColor: '#82B8D6',
    borderRadius: theme.spacing(1),
    padding: theme.spacing(4), 
    display: 'inline-block',
    textAlign: 'left',
    [theme.breakpoints.up('sm')]: {
      width: '60%',
    },
},
  button: {
    marginTop: theme.spacing(2),
  },
}));

const MainPage = () => {
  const classes = useStyles();

  return (
    <div>
      <MainPageNavbar />
      <div className={classes.mainPage}>
        <img src={bookImage} alt="Main Page" className={classes.background} />
        <div className={classes.mainContent}>
          <div className={classes.textContent}>
            <Fade in={true} timeout={2000}>
              <div>
                <Typography variant="h3" gutterBottom>
                  Welcome to BOIKHATA
                </Typography>
                <Typography variant="body1" paragraph>
                  Explore and discover the world of books. Read, review, and share your thoughts with the community.
                </Typography>
                <Typography variant="body1" paragraph>
                  This is a Book review website where users can review books, rate them, and interact with other book enthusiasts. You can also add more features such as book recommendations, discussions, author interviews, and more.
                </Typography>
                <Button component={Link} to='/signup' variant="contained" color="primary" className={classes.button}>
                  Get Started
                </Button>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
