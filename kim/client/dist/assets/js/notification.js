var Note = {
	model: {
		support: (window.Notification !== undefined),
		granted: (Notification.permission === "granted")
	},
	view: {
		notification: {
			create: function(title, body, icon) {
				
				if (Note.model.granted) {

					var details = {
						body: body,
						icon: icon
					}
					var note = new Notification(title, details);
					setTimeout(note.close.bind(note), 10000); 

				}				
			}
		}
	},
	controller: {
		init: function() {
			if (Note.model.support) {
				(Note.model.granted ? Note.controller.granted() : Note.controller.requestPermission());
			}
		},
		requestPermission: function() {
			Notification.requestPermission(function (permission) {
				Note.model.granted = permission;			    
				Note.controller.init();
			});
		},
		granted: function() {
			
			// Note.view.notification.create('Test message', 'Someone said: Lorem Ipsum', 'placeholder.jpg');
		}
	}
}
Note.controller.init();