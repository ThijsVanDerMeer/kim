module.exports = {
	Module: function(App) {
		var moduleObject = {
			
			login: function() {
				
				// from client-side
				var username = App.params.username;
				var password = App.params.password;

				App.db.executeQuery('SELECT * FROM users WHERE username = "'+username+'"', function(response){
								
					var userFound 	= (response.length === 1);
					var data 		= {token: null, error: true};

					if (userFound) {
						data = (App.crypt.decrypt(response[0].password) === password ? {token: response[0].token, error: false} : {token: null, error: true});
					}
					
					// respond to desired function
					App.io.to(App.socketid).emit('client', 
						{request: App.respondTo, data:data}
					);

					// respond to client-side API to set token					
					App.io.to(App.socketid).emit('client', {
						request: 'api.auth.setToken', data:data
					}); 

				});	
									
			}		

		}
		moduleObject[App.request]();
	}
}