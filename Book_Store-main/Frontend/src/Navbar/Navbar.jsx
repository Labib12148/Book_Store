import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from '../SearchBar/SearchBar.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    height:'4em',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2c3e50',
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 20px',
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
  content: {
    paddingTop: theme.spacing(8),
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/books');
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        console.error('Error fetching books:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error('Error fetching user info:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
    fetchBooks();
  }, []);

  const handleSearch = (searchTerm) => {
    console.log('Search term:', searchTerm);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setUser(null);
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title} component={Link} to="/home">
            BOIKHATA
          </Typography>

          <SearchBar books={books} onSearch={handleSearch} />

          <div>
            {user ? (
              <>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleProfileMenuClose}
                >
                  <MenuItem onClick={handleProfileMenuClose}>
                    {user.User_Name}'s Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button className={classes.button} component={Link} to="/login">
                  About
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
      </div>
    </div>
  );
};

export default Navbar;
