/**
 * MySQL connection
 */
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'projects.wdzone.nl',
    user     : 't.vandermeer',
    password : 'scooter',
    database : 'kim_nodejs',
    dateStrings: true
});
connection.connect();

/**
 * MySQL query executor with response
 */
var executeQuery = function(query, callback) {
	connection.query(query, function(err, rows, fields) {		
		
		if (err) {
			return callback(err, null);
		} else {
			return callback(rows);			
		}

		connection.end();
	}); 
}

module.exports = {connection, executeQuery};