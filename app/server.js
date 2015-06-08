var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('products',['products']);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.get('/products',function(req,res){
	console.log("I received a GET request");
    db.products.find(function(err,docs){
    	console.log(docs);
    	res.json(docs);
    });
});
app.post('/products', function (req, res) {
	console.log(req.body);
    db.products.insert(req.body, function(err, doc) {
	res.json(doc);
	});
});

app.listen(3000);
console.log("Server running on port 3000");