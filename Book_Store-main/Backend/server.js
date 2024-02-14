const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;
const csvFilePath = './csv/users.csv';
const authorsFilePath = './csv/authors.csv';
const userReviewsFilePath = path.join(__dirname, './csv/user_reviews.csv');
const userRatingsFilePath = path.join(__dirname, './csv/user_ratings.csv');

const csvWriter_signup = createObjectCsvWriter({
  path: csvFilePath,
  header: [
    { id: 'User_Name', title: 'User_Name' },
    { id: 'Email', title: 'Email' },
    { id: 'Password', title: 'Password' }
  ],
  append: true,
});

const csvWriterAuthors = createObjectCsvWriter({
  path: authorsFilePath,
  header: [
    { id: 'authorId', title: 'authorId' },
    { id: 'bookAuthor', title: 'bookAuthor' },
    { id: 'Email', title: 'Email' },
    { id: 'Password', title: 'Password' }
  ],
  append: true,
});

const csvWriterReviews = createObjectCsvWriter({
  path: userReviewsFilePath,
  header: [
    { id: 'User_Name', title: 'User_Name' },
    { id: 'isbn', title: 'isbn' },
    { id: 'Review', title: 'Review' }
  ],
  append: true,
});

const csvWriterRatings = createObjectCsvWriter({
  path: userRatingsFilePath,
  header: [
    { id: 'User_Name', title: 'User_Name' },
    { id: 'isbn', title: 'isbn' },
    { id: 'Rating', title: 'Rating' }
  ],
  append: true,
});



// Function to read CSV
const readCSV = async (filePath) => {
  try {
    const stream = fs.createReadStream(filePath).pipe(csv());
    const results = await new Promise((resolve, reject) => {
      const data = [];
      stream
        .on('data', (row) => data.push(row))
        .on('end', () => resolve(data))
        .on('error', (error) => reject(error));
    });
    return results;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    } else {
      throw error;
    }
  }
};

// Function to write CSV
const writeCSV = async (filePath, records) => {
  return new Promise((resolve, reject) => {
    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: Object.keys(records[0]).map((id) => ({ id, title: id })),
      append: false,
    });

    csvWriter
      .writeRecords(records)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};

// Middleware to check if the user is authenticated
const authenticateUser = (filePath) => async (req, res, next) => {
  try {
    const existingUsers = await readCSV(filePath);

    // Ensure that req.body exists and contains the expected properties
    if (!req.body || !req.body.User_Name || !req.body.Password) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    const { User_Name, Password } = req.body;

    const authenticatedUser = existingUsers.find(
      (user) =>
        user.User_Name &&
        user.User_Name.toLowerCase() === User_Name.toLowerCase() &&
        user.Password === Password
    );

    if (authenticatedUser) {
      req.user = authenticatedUser;
      next();
    } else {
      res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (error) {
    console.error(`Error authenticating author: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Middleware to check if the author is authenticated
const authenticateAuthor = (filePath) => async (req, res, next) => {
  try {
    const existingAuthors = await readCSV(filePath);

    // Ensure that req.body exists and contains the expected properties
    if (!req.body || !req.body.bookAuthor || !req.body.Password) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    const { bookAuthor, Password } = req.body;

    const authenticatedAuthor = existingAuthors.find(
      (author) =>
        author.bookAuthor &&
        author.bookAuthor.toLowerCase() === bookAuthor.toLowerCase() &&
        author.Password === Password
    );

    if (authenticatedAuthor) {
      req.author = authenticatedAuthor;
      next();
    } else {
      res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (error) {
    console.error(`Error authenticating user: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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
    
    res.status(201).json({ message: 'User created successfully'});
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
      res.status(200).json({ message: 'Login successful', userInfo: matchingUser });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(`Error logging in: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Signup route for authors
app.post('/signup/author', async (req, res) => {
  const { bookAuthor, Email, Password } = req.body;

  try {
    const existingAuthors = await readCSV(authorsFilePath);

    if (existingAuthors.some(author => author.bookAuthor && author.bookAuthor.toLowerCase() === bookAuthor.toLowerCase())) {
      return res.status(400).json({ message: 'bookAuthor already exists' });
    }

    if (Password.length < 8 || !/[a-zA-Z]/.test(Password) || !/\d/.test(Password)) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long and contain a mix of letters and numbers' });
    }

    await csvWriterAuthors.writeRecords([{ 'bookAuthor': bookAuthor, 'Email': Email, 'Password': Password }]);
    
    // Create an author profile with default values
    const authorProfile = { bookAuthor, Books: [] };

    // Append the author profile to the authors CSV file
    const authors = await readCSV(authorsFilePath);
    authors.push(authorProfile);
    await writeCSV(authorsFilePath, authors);

    res.status(201).json({ message: 'Author created successfully' });
  } catch (error) {
    console.error(`Error signing up author: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login route for authors
app.post('/login/author', authenticateAuthor(authorsFilePath), (req, res) => {
  res.status(200).json({ message: 'Author login successful', userInfo: req.user });
});

// API endpoint for authors to add their books
app.post('/api/author', async (req, res) => {
  try {
    const {
      bookTitle,
      bookAuthor,
      yearOfPublication,
      publisher,
      imageUrlM,
      genre,
      description,
    } = req.body;

    // Ensure required fields are provided
    if (!bookTitle || !bookAuthor || !yearOfPublication || !publisher || !imageUrlM || !genre || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const filePath = path.join(__dirname, './csv/authors.csv'); // Corrected file path
    const existingBooks = await readCSV(filePath);

    // Generate a unique ISBN number
    let newISBN;
    do {
      newISBN = generateISBN();
    } while (existingBooks.some(book => book.isbn === newISBN));

    const newBook = {
      bookTitle,
      bookAuthor,
      isbn: newISBN,
      yearOfPublication,
      publisher,
      imageUrlM,
      genre,
      description,
    };

    // Append the new book to the existing books
    existingBooks.push(newBook);

    // Update the authors CSV file
    await writeCSV(filePath, existingBooks);

    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    console.error(`Error adding book: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Route to save a user's review for a book
app.post('/api/reviews', authenticateUser(csvFilePath), async (req, res) => {
  try {
    const { isbn, review } = req.body;
    const userReviews = await readCSV(userReviewsFilePath);

    // Find the user's profile
    const userProfileIndex = userReviews.findIndex(user => user.User_Name === req.user.User_Name);

    // Check if the user has already reviewed the book
    const existingReviewIndex = userReviews[userProfileIndex].Reviews.findIndex(r => r.isbn === isbn);

    if (existingReviewIndex !== -1) {
      return res.status(400).json({ message: 'User has already reviewed this book' });
    }

    // Add a new review to the user's profile
    userReviews[userProfileIndex].Reviews.push({ isbn, Review: review });

    // Update the user_reviews CSV file
    await writeCSV(userReviewsFilePath, userReviews);

    res.status(200).json({ message: 'Review saved successfully' });
  } catch (error) {
    console.error(`Error saving review: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to save a user's rating for a book
app.post('/api/ratings', authenticateUser(csvFilePath), async (req, res) => {
  try {
    const { isbn, rating } = req.body;
    const userRatings = await readCSV(userRatingsFilePath);

    // Check if the user has already rated a book
    const existingRatingIndex = userRatings.findIndex((user) => user.User_Name === req.user.User_Name && user.Ratings.some((r) => r.isbn === isbn));

    if (existingRatingIndex !== -1) {
      return res.status(400).json({ message: 'User has already rated this book' });
    }

    // Add a new rating to the user's profile
    req.user.Ratings.push({ isbn, Rating: rating });
    
    // Update the user_ratings CSV file
    await writeCSV(userRatingsFilePath, userRatings);

    res.status(200).json({ message: 'Rating saved successfully' });
  } catch (error) {
    console.error(`Error saving rating: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to get the list of books
app.get('/api/books', async (req, res) => {
  try {
    const filePath = path.join(__dirname, './csv/best_selling_books.csv');
    const books = await readCSV(filePath);
    res.json(books);
  } catch (error) {
    console.error(`Error reading books data: ${error.message}`);
    res.status(500).json({ error: `Error reading books data: ${error.message}` });
  }
});

// API endpoint to get a single book by ISBN
app.get('/api/books/:isbn', async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const filePath = path.join(__dirname, './csv/best_selling_books.csv');
    const books = await readCSV(filePath);

    const book = books.find((book) => book.isbn === isbn);

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    console.error(`Error reading books data: ${error.message}`);
    res.status(500).json({ error: `Error reading books data: ${error.message}` });
  }
});

// API endpoint to get the list of ratings
app.get('/api/ratings', async (req, res) => {
  try {
    const filePath = path.join(__dirname, './csv/user_ratings.csv');
    const ratings = await readCSV(filePath);
    res.json(ratings);
  } catch (error) {
    console.error(`Error reading users data: ${error.message}`);
    res.status(500).json({ error: `Error reading users data: ${error.message}` });
  }
});

// New route to get the average rating for a specific ISBN
app.get('/api/books/averageRating/:isbn', async (req, res) => {
  try {
    const filePath = path.join(__dirname, './csv/user_ratings.csv');

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
