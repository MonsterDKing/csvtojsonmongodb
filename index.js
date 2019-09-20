let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

const csvFilePath='customers.csv'
const csv=require('csvtojson')

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log(jsonObj);

	
	MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
	  if (err) throw err;
	  var dbo = db.db("sistema");
	  dbo.collection("productos").insertMany(jsonObj, (err, res) => {
		if (err) throw err;
		console.log("Numero de registros insertados: " + res.insertedCount);
		
		db.close();
	  });
	});
})