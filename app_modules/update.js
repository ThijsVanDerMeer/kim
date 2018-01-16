module.exports = {
	Module: function(App) {
		var moduleObject = {
			
			assign: function() {
				App.db.executeQuery('UPDATE alerts SET assigned_to = "'+App.params.data.employee+'" WHERE id = "'+App.params.data.id+'" ', function(response){
					// BROADCAST!!
					App.io.emit('client',
					{request: App.respondTo, data: {id:App.params.data.id, employee:App.params.data.employee}  })
				});
			},
			close: function() {
				App.db.executeQuery('UPDATE alerts SET open = "0", priority = "4", closed_by = "'+App.params.data.employee+'" WHERE id = "'+App.params.data.id+'" ', function(response){
					// BROADCAST!!
					App.io.emit('client',
					{request: App.respondTo, data: {id:App.params.data.id, employee:App.params.data.employee}  })
				});
			}

		}
		moduleObject[App.request]();
	}
}