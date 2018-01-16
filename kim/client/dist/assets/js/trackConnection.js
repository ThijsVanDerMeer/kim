
var trackConnection = function() {

	$.ajax({ 
		url: 'http://192.168.59.50:3000',
		type: 'get',
		success: function() {
			setTimeout(trackConnection, 60000);	 
		},
		error: function() { 			

			var r = confirm("Lost connection with the server, want to retry?");
			if (r == true) {
			    location.reload();
			} else {
			    window.location.href = 'about:blank';
			}

		}
	});

}
trackConnection();
