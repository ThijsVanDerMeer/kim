var crypto = require('crypto');

var encrypt = function(text) {
	
	var cipher = crypto.createCipher('aes-256-ctr', 'd6F3Efes')
	var crypted = cipher.update(text,'utf8','hex')
	crypted += cipher.final('hex');
	return crypted;
}

var decrypt = function(text) {
	
	var decipher = crypto.createDecipher('aes-256-ctr', 'd6F3Efes')
	var dec = decipher.update(text,'hex','utf8')
	dec += decipher.final('utf8');
	return dec;
}

module.exports = { encrypt, decrypt };