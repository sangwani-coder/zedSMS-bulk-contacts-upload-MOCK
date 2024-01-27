const express = require("express");
const app = express();
const fs = require('fs'); // Import the file system module

const bodyParser = require('body-parser');

app.use(bodyParser.json()); // Parse JSON request bodies
// app.use(bodyParser.urlencoded({ extended: false })); // For URL-encoded bodies
const port = 3000;

// Read data from JSON file
const dataFilePath = './contacts.json'; // Adjust the path if needed
fs.readFile(dataFilePath, 'utf8', (err, dataString) => {
  if (err) {
    console.error('Error reading data file:', err);
    return;
  }

  // Hard-coded data (replace with your actual database data)
  const data = JSON.parse(dataString);

  // GET endpoint to retrieve data
  app.get('/data', (req, res) => {
    res.json(data);
  });
});

// POST endpoint to handle data submission
app.post('/data', (req, res) => {
  console.log('Received data:', req.body);
  res.status(201).send('Data received successfully!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});