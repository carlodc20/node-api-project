const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  endpoint: 'http://localhost:4566',
  s3ForcePathStyle: true,
  region: 'us-east-1',
});

const uploadHelloWorld = async (req, res) => {
  const params = {
    Bucket: 'my-test-bucket', // kailangan existing sa LocalStack S3
    Key: 'hello-world.txt',
    Body: 'Hello, World!',
  };

  try {
    await s3.putObject(params).promise();
    res.send('Successfully uploaded Hello World to S3!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to upload file');
  }
};

module.exports = {
  uploadHelloWorld,
};
