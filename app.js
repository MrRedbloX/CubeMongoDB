
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://admin:admin@cluster0.oddle.mongodb.net/Unity?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
	   const collection = client.db("Unity").collection("Cubes");
	   collection.find().toArray((err, cubes) => { 
		res.send(cubes);
		client.close();
	  }
		  )
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

