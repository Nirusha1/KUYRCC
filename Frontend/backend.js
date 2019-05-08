const express = require('express');
const path=require('path');
const mongoose=require('mongoose');


mongoose.connect('mongodb://localhost/KUYRCCdb');
let db = mongoose.connection;


//check db connection
db.once('open', function(){
	console.log('connected to mongoDB');
});

//check for db errors
db.on('error', function(err){
	console.log(err);

});

//init backend
const backend=express();
backend.use(express.static('img'));

//Bring in models
let Users = require('./models/users');

//load view engine
backend.set('views', path.join(__dirname, 'views'));
backend.set('view engine','pug');


//home route
backend.get('/', function(req, res){
				res.render('index',{
				title:'KUYRCC'
	});
});
//FrontEnd page route
backend.get('/frontend', function(req, res){
				res.render('frontend',{
					title:'FrontEnd'
	});
});

//add route
backend.get('/signup/register', function(req, res){
	res.render('register',{
		title:'Register'

	});

});

//for checking if users are registered in database or not route
backend.get('/signup/lists', function(req, res){
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/kuyrccdb';

	MongoClient.connet(url, function(err, users){
		if(err){
			console.log("unable to connnet to server",err);
		}else{
			console.log("connection established");
			var collection = db.collection('kuryccdb');
			collction.find({}).toArray(function(err,result){
				if(err){
					res.send(err);
				}else if (result.length){
					res.render('lists',{
						"lists":result
					});
				}else{
					res.send('No documents found');
				}
				db.close();
			});

		}
	});
});


//for checking if users are registered in database or not route
backend.get('/signup/lists', function(req, res){
	Users.find({}, function(err, users){
		if(err){
			console.log(err);
		}else{
			res.render('index',{
				title:'Lists',
				users: users
			});
		}
	});
});
//add registration route
backend.post('/signup/register', function(req, res){
	console.log('submitted');
	return;
});

//to start server
backend.listen(3000,function(){
	console.log('Server started on port 3000...');
});
