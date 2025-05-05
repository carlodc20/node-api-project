const AWS = require('aws-sdk');

const localstackEndpoint = 'http://localhost:4566';

// Initialize S3 client
const s3 = new AWS.S3({
  endpoint: localstackEndpoint,
  s3ForcePathStyle: true,
  region: 'us-east-1'
});

// Function to list all S3 buckets
const listBuckets = () => {
  return new Promise((resolve, reject) => {
    s3.listBuckets((err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Buckets);
      }
    });
  });
};

// Export the listBuckets function to use it elsewhere
module.exports = {
  listBuckets
};
