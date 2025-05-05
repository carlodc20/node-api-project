const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const path = require('path');

const app = express();

// Setup for AWS SDK and LocalStack
const localstackEndpoint = 'http://localhost:4566';
const s3 = new AWS.S3({
  endpoint: localstackEndpoint,
  s3ForcePathStyle: true,
  region: 'us-east-1'
});

// Middleware to parse JSON
app.use(express.json());

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const params = {
    Bucket: 'my-test-bucket',  // Make sure this is the bucket you created on LocalStack
    Key: path.basename(file.originalname),
    Body: file.buffer,
    ContentType: file.mimetype
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error uploading file.');
    }
    res.send(`File uploaded successfully: ${data.Location}`);
  });
});

// Hello World Upload route
app.post('/upload-hello', async (req, res) => {
  const params = {
    Bucket: 'my-test-bucket',  // Make sure this bucket exists in LocalStack
    Key: 'hello-world.txt',
    Body: 'Hello, World!',
    ContentType: 'text/plain'
  };

  try {
    await s3.putObject(params).promise();
    res.send('Hello World uploaded successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading Hello World.');
  }
});

// Hello World text file content
const helloWorldContent = 'Hello, World!';

// Create a simple route to upload a Hello World file to S3
app.get('/upload-hello', (req, res) => {
  const helloWorldContent = 'Hello, World!';
  const params = {
    Bucket: 'my-test-bucket',  // Ensure this is the correct bucket
    Key: 'hello-world.txt',  // File name
    Body: helloWorldContent,  // File content
    ContentType: 'text/plain',  // Content type
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).send('Error uploading Hello World');
    }
    res.send(`File uploaded successfully: ${data.Location}`);
  });
});

module.exports = app;
