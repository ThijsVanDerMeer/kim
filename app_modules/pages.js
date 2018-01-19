module.exports = {
	Module: function(App) {
		var moduleObject = {			
			
			/**
			 * USER ROLE
			 */
			userRole: function(callback) {
				//App.token = 'JSU-475-KFHF-3845-NHFH';
                //console.log(App.crypt.encrypt("10Kim!59")); -> b649671e69a57da1

				App.db.executeQuery('SELECT role FROM users WHERE token = "'+App.token+'"', function(response){
					var role = 0;
					if (response.length === 1) {
						role = response[0].role;
					}						
					return callback(role);
				});

			},
			/**
			 * GET TEMPLATE HTML AND RETURN TO CLIENT
			 */
			renderTemplate: function(data, vars) {
				App.app.render(data.template, vars, function(err, html){
				  	App.io.to(App.socketid).emit('client', 
						{request: App.respondTo, data: {html:html, auth:data.auth}}
					); 
				});	

			},
			/**
			 * PAGES
			 */
			dashboard: function() {

				var today = App.moment(Date.now()).format('DD-MM-YYYY');
				
				var vars = {
					today: today				
				}

				moduleObject.userRole(function(role){

					var data = (role == 1 ? {template: "dashboard", auth: true} : {auth: false});				
					moduleObject.renderTemplate(data, vars);
				});				

			},
			users: function() {

				var vars = {};

				moduleObject.userRole(function(role){

					var data = (role == 1 ? {template: "users", auth: true} : {auth: false});				
					moduleObject.renderTemplate(data, vars);
				});
									
			},
			login: function() {

				var vars = {};

				var data = {template: "login", auth: true};
				moduleObject.renderTemplate(data, vars);


									
			}

		}
		moduleObject[App.request]();
	}
}