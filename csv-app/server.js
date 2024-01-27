const express = require("express");
const app = express();

const port = 3333;
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://mightypz2:dev200Connects@cluster0.ifurnju.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

// MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
//   if (err) {
//     console.error('Error connecting to MongoDB:', err);
//     return;

//   }else {
//     console.log("Connected to MongoDB")
//   }
const db = client.db("zedsms_contacts_mock");


async function retrieveData() {
  try {
    const collection = db.collection("conpanies");

    // Find the first document in the collection
    const data = await collection.findOne(); // Use findOne to retrieve only the first document

    // Find Specific Company data
    const companyBData = data.companies.find(company => company.name === 'Company A');
    return companyBData;

  } catch (err) {
    console.error('Error in retrieveData function:', err);
    throw err; // Re-throw the error to handle it in the endpoint
  } finally {
    await client.close();
  }
}



// GET endpoint to retrieve the first document
app.get('/data', async (req, res) => {
  try {
    const firstDoc = await retrieveData();
    if (firstDoc) {
      res.json(firstDoc);
    } else {
      res.status(404).send('No documents found');
    }
  } catch (err) {
    console.error('Error in GET endpoint:', err);
    res.status(500).send('Error retrieving data');
  }
});

// // POST endpoint to retrieve the first document
// app.get('/data', async (req, res) => {
//   try {
//     const data = 
//     const firstDoc = await retrieveData();
//     if (firstDoc) {
//       res.json(firstDoc);
//     } else {
//       res.status(404).send('No documents found');
//     }
//   } catch (err) {
//     console.error('Error in GET endpoint:', err);
//     res.status(500).send('Error retrieving data');
//   }
// });
// });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});