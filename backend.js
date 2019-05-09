const express = require('express');
const path=require('path');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

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
//defining path to img folder
backend.use(express.static('img'));

//Bring in models
let dbvariable = require('./models/users');

//load view engine
backend.set('views', path.join(__dirname, 'views'));
backend.set('view engine','pug');

//Body parser Middleware
// parse application/x-www-form-urlencoded
backend.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
backend.use(bodyParser.json())

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
backend.get('/KUYRCC/SignUP/', function(req, res){
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
backend.post('/KUYRCC/SignUP/', function(req, res){
	console.log('submitted');
	let x= new dbvariable();
	x.name=req.body.name;
	x.email=req.body.email;
	x.password=req.body.password;
	console.log(req.body.name);

	x.save(function(err){
		if(err){
			console.log(err);
			return;
		}
		else{
			res.redirect('/');
		}
	});
	return;
});

//to start server
backend.listen(3000,function(){
	console.log('Server started on port 3000...');
});
