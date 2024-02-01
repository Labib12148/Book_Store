const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const auth = require('./auth');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;
const csvFilePath = 'users.csv';
const csvWriter_signup = createObjectCsvWriter({
  path: csvFilePath,
  header: [
    { id: 'User_Name', title: 'User_Name' },
    { id: 'Email', title: 'Email' },
    { id: 'Password', title: 'Password' }
  ],
  append: true,
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, auth.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token expired or invalid' });
    }

    req.user = decoded;
    next();
  });
};

// Protected route example
app.get('/protected', verifyToken, (req, res) => {
  // Access user information using req.user
  res.json({ message: 'Protected route accessed', user: req.user });
});

// Helper function to read CSV files
const readCSV = async (filePath) => {
  const results = [];
  const stream = fs.createReadStream(filePath).pipe(csv());
  for await (const record of stream) {
    results.push(record);
  }
  return results;
};

// Signup route
app.post('/signup', async (req, res) => {
  const { User_Name, Email, Password } = req.body;

  try {
    // Read the existing users from the CSV
    const existingUsers = await readCSV(csvFilePath);

    // Check if the User_Name already exists (case-insensitive)
    if (existingUsers.some(user => user.User_Name && user.User_Name.toLowerCase() === User_Name.toLowerCase())) {
      return res.status(400).json({ message: 'User_Name already exists' });
    }

    // Check password requirements
    if (Password.length < 8 || !/[a-zA-Z]/.test(Password) || !/\d/.test(Password)) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long and contain a mix of letters and numbers' });
    }

    // Write new user to CSV
    await csvWriter_signup.writeRecords([{ 'User_Name': User_Name, 'Email': Email, 'Password': Password }]);
    
    // Generate a token
    const token = auth.generateToken({ User_Name, Email, Password });
    
    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Read the existing users from the CSV
    const existingUsers = await readCSV(csvFilePath);

    // Check if the provided username and password match any user in the CSV
    const matchingUser = existingUsers.find(
      (user) =>
        user.User_Name &&
        user.User_Name.toLowerCase() === username.toLowerCase() &&
        user.Password === password
    );

    if (matchingUser) {
      // Generate a token
      const token = auth.generateToken({ User_Name: matchingUser.User_Name, Email: matchingUser.Email });

      // Set the token in response header
      res.set('Authorization', token);

      setTimeout(() => {
        res.redirect('/');
      }, 30000);

      res.status(200).json({ message: 'Login successful', token });
      setTimeout(() => {
      res.redirect('/');
      }, 30000);
    } else {
      res.status(401).json({ message: 'Incorrect Username or Password' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to get the list of books
app.get('/api/books', async (req, res) => {  
  try {
    const filePath = path.join(__dirname, 'best_selling_books.csv');
    const books = await readCSV(filePath);
    res.json(books);
  } catch (error) {
    console.error('Error reading books data:', error);
    res.status(500).json({ error: 'Error reading books data' });
  }
});

// API endpoint to get a single book by ISBN
app.get('/api/books/:isbn', async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const filePath = path.join(__dirname, 'best_selling_books.csv');
    const books = await readCSV(filePath);

    const book = books.find((book) => book.isbn === isbn);

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    console.error('Error reading books data:', error);
    res.status(500).json({ error: 'Error reading books data' });
  }
});

app.get('/api/search', async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const filePath = path.join(__dirname, 'best_selling_books.csv');
    const books = await readCSV(filePath);

    let matchingBooks = [...books];

    if (searchTerm) {
      matchingBooks = matchingBooks.filter((book) =>
        book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (matchingBooks.length > 0) {
      res.json(matchingBooks);
    } else {
      res.status(404).json({ error: 'No matching books found' });
    }
  } catch (error) {
    console.error('Error reading books data:', error);
    res.status(500).json({ error: 'Error reading books data' });
  }
});


// API endpoint to get the list of ratings
app.get('/api/ratings', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'user_rating.csv');
    const ratings = await readCSV(filePath);
    res.json(ratings);
  } catch (error) {
    console.error('Error reading users data:', error);
    res.status(500).json({ error: 'Error reading users data' });
  }
});

// New route to get the average rating for a specific ISBN
app.get('/api/books/averageRating/:isbn', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'user_ratings.csv');

    // Read the CSV file
    const records = await readCSV(filePath);

    // Filter records based on the specified ISBN
    const filteredRecords = records.filter(record => record.isbn === req.params.isbn);

    // Calculate the average rating
    if (filteredRecords.length > 0) {
      const totalRating = filteredRecords.reduce((sum, record) => sum + parseInt(record.bookRating), 0);
      const averageRating = totalRating / filteredRecords.length;
      res.json({ isbn: req.params.isbn, averageRating });
    } else {
      // Send a 404 status without trying to call .json
      res.status(404).send('ISBN not found');
    }
  } catch (error) {
    console.error('Error reading books data:', error);
    // Send a 500 status without trying to call .json
    res.status(500).send('Error reading books data');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});