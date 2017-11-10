// This handles the functions for index.ts, just to make things cleaner

const pug = require('pug');
const compileUsers = pug.compileFile('users.pug');

var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'testingDB'
});
connection.connect();

exports.logNavigation = function(req){
	console.log(req.url);
};

exports.selectFullRow = function(req){
	var id = req.query.id;
	var name = req.query.name;
	var age = req.query.age;
	var location = req.query.location;
	var orderBy = req.query.orderBy;

	var sql = "SELECT * FROM people WHERE 1 = 1"; // do the 1=1 in case none of the below are valid
	if(id!=null){  sql = sql+ " AND id="+id;  }
	if(name!=null){  sql = sql+ " AND name='"+name+"'";  } // don't forget the single quotes
	if(age!=null){  sql = sql+ " AND age="+age;  }
	if(location!=null){  sql = sql+ " AND location='"+location+"'";  }
	if(orderBy!=null){  sql = sql+ " ORDER BY "+orderBy;  }
	return sql;
}

exports.printResults = function(sql, res){
	connection.query(sql, function (err, rows, fields){
		if(err){
			console.log(err.message);
			return res.status(500).send(err);
		}
		var printResults = compileUsers({ results: rows });
		res.send(printResults);
	});
}

exports.insert = function(req, res){
	var name = req.body.name;
	var age = req.body.age;
	var location = req.body.location;

	connection.query("INSERT INTO people(name, age, location) VALUES('"+name+"', "+age+", '"+location+"')", function (err){
		if(err){
			console.log(err.message);
			return res.status(500).send(err);
		}
		console.log("Insertion successful");
	});
}

exports.del = function(req, res){
	var id = req.query.id;
	var name = req.query.name;
	var age = req.query.age;
	var location = req.query.location;

	if(id==null && name==null && age==null && location==null){
		console.log("ERROR! No specifications were entered.");
	}else{
		var sql = "DELETE FROM people WHERE 1=1";
		if(id!=null){  sql = sql+ " AND id="+id;  }
		if(name!=null){  sql = sql+ " AND name='"+name+"'";  } // don't forget the single quotes
		if(age!=null){  sql = sql+ " AND age="+age;  }
		if(location!=null){  sql = sql+ " AND location='"+location+"'";  }

		connection.query(sql, function (err){
			if(err){
				console.log(err.message);
				return res.status(500).send(err);
			}
			console.log("Deletion successful!");
		});
	}
}