const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); // load environment variables from .env

// Import your app (app.js)
const app = require('./app');  // Assuming app.js is in the same directory
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
