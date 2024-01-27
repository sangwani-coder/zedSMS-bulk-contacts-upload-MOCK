const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const port = 3333;
const { MongoClient } = require('mongodb');
const uri = "";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);
const db = client.db("zedsms_mock");


async function retrieveData(company_name) {
  try {
    const collection = db.collection("contacts");

    // Find the first document in the collection
    const data = await collection.findOne(); // Use findOne to retrieve only the first document
    // const companyBData = data.companies.find(company => company.name === company_name);
    // console.log(companyBData);
    return data;

  } catch (err) {
    console.error('Error in retrieveData function:', err);
    throw err; // Re-throw the error to handle it in the endpoint
  } finally {
    await client.close();
  }
}

async function InsertData(data) {
  try {
    const collection = db.collection("contacts");
    const result = await collection.insertOne(data);
    console.log(`Data inserted successfully with ID: ${result.insertedId}`);
  } catch (err) {
    console.error('Error inserting data:', err);
    throw err; // Re-throw the error to handle it in the endpoint
  }
}

// GET endpoint to retrieve the first document
app.get('/data', async (req, res) => {
  try {
    const company = req.query.company_name;
    const result = await retrieveData(company);
    if (result) {
      res.json(result);
    } else {
      res.status(404).send('No documents found');
    }
  } catch (err) {
    console.error('Error in GET endpoint:', err);
    res.status(500).send('Error retrieving data');
  }
});

// POST endpoint to retrieve the first document
app.post('/data', bodyParser.json(), async (req, res) => {
  try {
    await InsertData(req.body); // Pass the parsed request body to insertData
    res.status(201).send('Data saved successfully!');
  } catch (err) {
    console.error('Error in POST endpoint:', err);
    res.status(500).send('Error saving data');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});