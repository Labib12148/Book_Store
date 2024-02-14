import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    height: '4em',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#E09494',
    position: 'fixed',
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.down('sm')]: {
      height: '3em',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 20px',
    [theme.breakpoints.down('sm')]: {
      padding: '0 10px',
    },
  },
  title: {
    fontSize: '1.5rem',
    color: 'white',
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
    },
  },
  button: {
    padding: '0 10px',
    color: '#F7F7F7',
    '&:hover': {
      backgroundColor: '#698aac',
    },
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
      padding: '0 5px',
    },
  },
  content: {
    paddingTop: theme.spacing(8),
  },
}));

const LoginNavbar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title} component={Link} to="/">
            BOIKHATA
          </Typography>

          <div>
            <Button component={Link} to="/login" className={classes.button}>
              Login
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

export default LoginNavbar;
