
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const {MongoClient, ObjectId} = require('mongodb')
const uri = "mongodb+srv://admin:admin@cluster0.oddle.mongodb.net/Unity?retryWrites=true&w=majority";

app.get('/', (req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
	   collection = client.db("Unity").collection("Cubes");
	   collection.find().toArray((err, cubes) => { 
		res.send(cubes);
		client.close();
	  }
		  )
  });
})

app.get('/id', (req, res) => {
	if(req.query.id) {
	 client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
		client.connect(err => {
	   collection = client.db("Unity").collection("Cubes");
	   try {
		   collection.findOne({'_id': ObjectId(req.query.id) }, (err, cube) => {
			 if(err) throw err
			 res.send(cube)
		  })
	   }
	   catch (e) {
		   res.send({x: 0, y: 0, z: 0})
	   }
	   
	   finally {
		   client.close()
	   }
  });
	}
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

