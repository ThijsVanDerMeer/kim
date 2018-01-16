module.exports = {
	Module: function(App) {
		var moduleObject = {
			
			config: function() {

				App.fs.readFile('./router/config.json', 'utf8', function (err,data) {
					App.io.to(App.socketid).emit('client', 
						{request: App.respondTo, data: {json:JSON.parse(data), error: false}}
					); 
				});				
									
			}

		}
		moduleObject[App.request]();
	}
}