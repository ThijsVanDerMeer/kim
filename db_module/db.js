/**
 * MySQL connection
 */
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'kim',
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