var express =require('express');
var app = express();
var mongoose = require('mongoose');
var mongoURI = 'mongodb://localhost:27017/angular-products';
var MongoDB = mongoose.connect(mongoURI).connection;
MongoDB.on('error', function(err){
	console.log(err.message);
});
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});
app.configure(function(){
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
});
var Product = mongoose.model('Product',{
	name: String,
	price: Number,
	shipping: String,
	seller: String ,
	stock: Number

});
//Get Method
app.get('/api/products',function(req,res){
	Product.find(function(err, products){
		if(err){
			res.send(err);
		}
		res.json(products);
	});
});
//Post Method
app.post('/api/products',function(req,res){
	Product.create({
		text: req.body.text,
		done: false
	},function(err,product){
		if(err){
			res.send(err);
		}
		Product.find(function(err, products){
			if(err){
				res.send(err);
			}
			res.json(products);

		});
	});
});
//Delet Method
app.delete('/api/products/:product',function(req,res){
	Product.remove({
		_id: req.params.product
	}, function(err,product){
		if(err){
			res.send(err);
		}
		Todo.find(function(err, products){
			if(err){
				res.send(err);
			}
			res.json(products);

		});
	});
});
app.get('*', function(req,res){
	res.sendfile('./public/index.html');
});
app.listen(8080,function(){
	console.log('App listening on port 8080');
});