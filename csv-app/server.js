const express = require("express");
const app = express();
const fs = require('fs'); // Import the file system module

const bodyParser = require('body-parser');


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mightypz2:dev200Connects@cluster0.ifurnju.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // Make the appropriate DB calls
    await  listDatabases(client);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


app.use(bodyParser.json()); // Parse JSON request bodies
// app.use(bodyParser.urlencoded({ extended: false })); // For URL-encoded bodies
const port = 3000;


// // Read data from JSON file
// const dataFilePath = './contacts.json'; // Adjust the path if needed
// fs.readFile(dataFilePath, 'utf8', (err, dataString) => {
//   if (err) {
//     console.error('Error reading data file:', err);
//     return;
//   }

//   // Hard-coded data (replace with your actual database data)
//   const data = JSON.parse(dataString);

//   // GET endpoint to retrieve data
//   app.get('/data', (req, res) => {
//     res.json(data);
//   });
// });

// POST endpoint to handle data submission
app.post('/data', (req, res) => {
  console.log('Received data:', req.body);
  res.status(201).send('Data received successfully!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});