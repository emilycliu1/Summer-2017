// THIS IS THE SERVER STUFF FOR PROJECT

var functions = require("./index_functions"); // imports index_functions.ts, kind of like an object

var express = require('express');
var app = express();
var path    = require("path");

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

//======================================================================================================
//======================================================================================================

app.get('/', function (req, res){
	functions.logNavigation(req);
	res.sendFile(path.join(__dirname+'/home.html'));
});

app.get('/users', function (req, res){
	functions.logNavigation(req);
	var sql = functions.selectFullRow(req);
	functions.printResults(sql, res);
});

app.post('/add', function (req, res){
	functions.logNavigation(req);
	functions.insert(req, res);
});

app.delete('/delete', function (req, res){
	functions.logNavigation(req);
	functions.del(req, res);
});


//======================================================================================================
//======================================================================================================

app.listen(3000, function(){
	console.log('Listening on port 3000!');
});

app.use(express.static('../public')); // So we can access the css and js files in the public directory

app.use(function (req, res, next) {
	console.log("Cannot find "+req.url);
	res.status(404).send("Sorry, I can't seem to find that!");
	next();
});



