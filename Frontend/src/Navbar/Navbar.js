import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Avatar, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from './SearchBar';
import avatarImg from '../assets/imgs/Avatar.jpg';

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
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
    cursor: 'pointer',
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    if (storedToken) {
      const decodedToken = JSON.parse(atob(storedToken.split('.')[1]));
      setUser({ username: decodedToken.User_Name });
    }
  }, []);

  const handleSearch = (searchTerm) => {
    console.log('Search term:', searchTerm);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title} component={Link} to="/">
            BOIKHATA
          </Typography>

          <SearchBar onSearch={handleSearch} />

          <div>
            {user ? (
              <>
                <Avatar
                  alt={user.username}
                  src={avatarImg}
                  className={classes.avatar}
                  onClick={handleProfileClick}
                />

                <Button className={classes.button} onClick={() => navigate('/home')}>
                  Home
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleProfileMenuClose}
                >
                  <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                {/* Add any components for non-logged-in state */}
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;