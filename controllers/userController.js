var user = require('../models/user')

const mysql = require('mysql2');

const con = mysql.createConnection({
	host: "localhost",
	user: "'userDemoUser'",
	password: "letmein!",
	database: "demoDb"
});

con.connect((err) => {
	if(err) throw err;
	console.log("Database (mysql) connected!");

	var sql = "use demoDb;";
	con.query(sql, () => {
		if(err) throw err;
	})
});

exports.getUsers = function(req, res) {
	var users = [];

	let sql = "select * from users;"
	con.query(sql, (err, rows, fields) => {
		if(err) throw err;
		for(let i=0; i< rows.length; i++) {
			let userRow = user.createUser(rows[i].firstName, rows[i].lastName, rows[i].email, rows[i].password);
			users.push(userRow);
		}

		//console.log(users);

		res.setHeader('Content-Type', 'application/json');
		res.send(users);
	});
	
}

exports.saveUser = function(req, res) {
	let sql = "insert into users (firstName, lastName, email, password) "
		+ "values ('" 
			+ req.body.firstName + "', '" 
			+ req.body.lastName + "', '" 
			+ req.body.email + "', '" 
			+ req.body.password 
		+ "');";
	
	con.query(sql, (err, result) => {
		if(err) throw err;

		//console.log(result);

		res.setHeader('Content-Type', 'application/json');
		res.send(result);
	})
}

exports.getUser = function(req, res) {
	res.setHeader('Content-Type', 'application/json');
  res.send(users[req.params.userId]);
}

exports.deleteUser = function(req, res) {
	users.splice(req.params.userId, 1);
	res.setHeader('Content-Type', 'application/json');
	res.send(users);
}

exports.updateUser = function(req, res) {
	// get the existing user from the array
	var updatedUser = users[req.params.userId];

	// check to see what has been passed and update the local copy
	console.log(req.body.firstName);
	if(req.body.firstName)

		updatedUser.firstName = req.body.firstName;
	if(req.body.lastName)
		updatedUser.lastName = req.body.lastName;
	if(req.body.email)
		updatedUser.email = req.body.email;
	if(req.body.password)
		updatedUser.password = req.body.password;

	// save the local copy of the user back into the array
	users[req.params.userId] = updatedUser;

	res.setHeader('Content-Type', 'application/json');
	res.send(users[req.params.userId]);
}
