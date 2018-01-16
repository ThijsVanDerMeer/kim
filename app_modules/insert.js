module.exports = {
	Module: function(App) {
		var moduleObject = {
			newAlert: function() {
			
				var formData = App.params.data;

				var created_on = App.moment(Date.now()).format('YYYY-MM-DD H:mm:ss');

				var deadline = null;

				var customer = formData.firstname + ' ' + formData.lastname;

				if (formData.deadlineDate.length === 0) {
					deadline = App.moment(Date.now()).format('YYYY-MM-DD') + ' ' + formData.deadlineTime;
				} else {
					deadline = formData.deadlineDate + ' ' + formData.deadlineTime;
				}

				App.db.executeQuery('INSERT INTO alerts (open, created_on, customer, company, telephone, short_description, long_description, deadline, created_by, assigned_to, closed_by, priority) VALUES ("1", "'+created_on+'", "'+customer+'", "'+formData.company+'", "'+formData.telephone+'", "'+formData.shortDescription+'", "'+formData.longDescription+'", "'+deadline+'", "'+formData.createdBy+'", "'+formData.assignedTo+'", "", "'+formData.priority+'")', function(response){										
					
					App.io.emit('client', 
						{request: App.respondTo, data:response
					});
					
				});	

				// Send notification
				moduleObject.sendNotification(formData.assignedTo, formData, deadline, customer);

				// newContact?
				if(formData.newContact) {

					moduleObject.addCustomer();

				}
			},
			addCustomer: function() {

				var formData = App.params.data;

				App.db.executeQuery('INSERT INTO customers (company, firstname, lastname, telephone) VALUES ("'+formData.company+'", "'+formData.firstname+'", "'+formData.lastname+'", "'+formData.telephone+'")', function(response){
					
				});

			},
			sendNotification: function(name, formData, deadline, customer) {
				
				// Browser native notification
				App.db.executeQuery('SELECT token, emailaddress FROM users WHERE full_name = "'+name+'"', function(response){
					
					var toSocketId = App.getSocketId(response[0].token);					

					App.io.to(toSocketId).emit('client',
					{request: 'components.dashboard.view.notification', data:null}) 

					// sendmail
					moduleObject.sendEmail(response[0].emailaddress, name, formData, deadline, customer);

				});				

			},
			sendEmail: function(address, name, formData, deadline, customer) {
				  // E-mail
				var transporter = App.nodemailer.createTransport({
					host: "smtp.gmail.com",
					secureConnection: true,
					port: 465,
					auth: {
					  user: 'webbouwers.com@gmail.com',
					  pass: 'webappbouwers'
					}    
				});
				transporter.verify(function(error, succes){
					if (error) {
					  console.log(error);
					} else {
					  console.log('Server is ready to take our messages');
					}
				});
				var mailOptions = {
					from: '"Webbouwers KIM" <webbouwers.com@gmail.com>',
					to: '"'+name+'" <'+address+'>',
					subject: 'Er is een melding aan jou gekoppeld',
					html: 'Beste '+name+', <p>Er is een melding aan jou gekoppeld door '+formData.createdBy+'.<br />De klant, '+customer+' ('+formData.company+'), dient uiterlijk voor '+deadline+' teruggebeld te worden.</p><p><b>Extra informatie</b><br /><br />Telefoonnummer: '+formData.telephone+'<br />Korte omschrijving: '+formData.shortDescription+'<br />Uitgebreide omschrijving: '+formData.longDescription+'<br /><br />Prioriteit: '+formData.priority+'</p><p><b>Afgehandeld?</b><br /><br />Ga naar <a href="https://webbouwers.com/kim2" target="_blank">https://webbouwers.com/kim2</a>  om de melding op afgehandeld te zetten.</p><p><hr /><br />Dit bericht is automatisch verstuurd door Webbouwers KIM applicatie.</p>'
				};
				transporter.sendMail(mailOptions, function(error, info){
					if (error) {
					  console.log(error);
					} else {
					  console.log('Message sent: ' + info.response);
					}
				});
			}
			

		}
		moduleObject[App.request]();
	}
}