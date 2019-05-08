const express = require('express');
const path=require('path');
const mongoose=require('mongoose');


mongoose.connect('mongodb://localhost:27017/KUYRCCdb');
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



//Bring in models
let dbvariable = require('./models/users');

//load view engine
backend.set('views', path.join(__dirname, 'views'));
backend.set('view engine','pug');



//home route
backend.get('/', function(req, res){
	
				res.render('index',{
				title:'KUYRCC'
	

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
	dbvariable.find({}, function(err, users){
		if(err){
			console.log(err);
		}else{
			res.render('lists',{
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