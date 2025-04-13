const express = require('express');
const app = express();
const port = 3000;

// Sample route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
});
