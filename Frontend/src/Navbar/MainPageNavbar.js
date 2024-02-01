import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appBar: {
      height: '4rem',
      backgroundColor: '#2c3e50',
      justifyContent: 'center',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: '1.5rem',
      color: 'white',
      textDecoration: 'none',
    },
    button: {
      padding: '0 10px',
      color: '#F7F7F7',
      '&:hover': {
        backgroundColor: '#698aac',
      },
      textDecoration: 'none',
    },
  }));


const MainPageNavbar = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
          <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
            <Typography variant="h6" className={classes.title}>
              BOIKHATA
            </Typography>
  
            <div>
              <Button component={Link} to="/login" className={classes.button}>
                Login
              </Button>
              <Button component={Link} to="/signup" className={classes.button}>
                Sign Up
              </Button>
              <Button component={Link} to="/about" className={classes.button}>
                About
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  };

export default MainPageNavbar;
