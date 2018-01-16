module.exports = {
	Module: function(App) {
		var moduleObject = {
			
			helloWorld: function() {
				// Send response to clientside	
				App.db.executeQuery('SELECT * FROM messages', function(response){					
					App.io.to(App.socketid).emit('client', 
						{request: App.respondTo, data:response
					});
				});						
			},
			userList: function() {
				App.db.executeQuery('SELECT id, full_name FROM users ORDER BY full_name ASC', function(response){
					App.io.to(App.socketid).emit('client',
					{request: App.respondTo, data:response})
				});
			},
			currentAlerts: function() {
				App.db.executeQuery('SELECT * FROM alerts WHERE open = "1" ORDER BY priority ASC', function(response){

					App.io.to(App.socketid).emit('client',
						{request: App.respondTo, data:response
					});

				});	
			},
			closedAlerts: function() {

				var day = App.moment().format('YYYY-MM-DD');				

				if (App.params !== null) {
					day = App.params.date;
				}				

				App.db.executeQuery('SELECT * FROM alerts WHERE open = "0" AND DATE(created_on) = "'+day+'" ORDER BY priority ASC', function(response){					

					App.io.to(App.socketid).emit('client',
						{request: App.respondTo, data:response
					});

				});	
			},
			autoComplete: function() {

				var find = App.params.value;

				App.db.executeQuery('SELECT * FROM customers WHERE company LIKE "'+find+'%" ORDER BY company ASC', function(response){					

					App.io.to(App.socketid).emit('client',
					{request: App.respondTo, data:response})
				});

			},
			userInfo: function() {
				App.db.executeQuery('SELECT full_name FROM users WHERE token = "'+App.token+'" LIMIT 1', function(response){					

					App.io.to(App.socketid).emit('client',
					{request: App.respondTo, data:response})
				});
			}

		}
		moduleObject[App.request]();
	}
}