const mysql = require('mysql');
const dbconfig = require('./database');
const connection = mysql.createConnection(dbconfig.connection);

const db = async (query) => {
	connection.query('USE ' + dbconfig.database);
	return new Promise((resolve, reject) => {
		connection.query(query, (err, rows) => {
			if(!err){
				resolve(rows);
			} else {
				reject(err);
			};
		});
	});
};

module.exports = db;