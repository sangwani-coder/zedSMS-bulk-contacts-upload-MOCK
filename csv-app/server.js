const express = require("express");
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json()); // Parse JSON request bodies
// app.use(bodyParser.urlencoded({ extended: false })); // For URL-encoded bodies
const port = 3000;

// Hard-coded data (replace with your actual database data)
const data = [
    { id: 1, name: 'zyambo', email: 'zyambo@example.com' },
    { id: 2, name: 'Mutale', email: 'mutale@example.com' },
    { id: 2, name: 'Phiri', email: 'phiri@example.com' }
  ];
  
  // GET endpoint to retrieve data
  app.get('/data', (req, res) => {
    res.json(data);
  });
  
  // POST endpoint to handle data submission
  app.post('/data', (req, res) => {
    console.log('Received data:', req.body);
    res.status(201).send('Data received successfully!');
  });
  
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });