const jwt = require('jsonwebtoken');

// Replace 'YOUR_SECRET_KEY' with an actual secret key for JWT
const JWT_SECRET = 'cr7siuuu';

// Function to generate a JWT token
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

module.exports = {
  JWT_SECRET,
  generateToken,
};
