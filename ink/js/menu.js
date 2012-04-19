define(function(){
	var socket = io.connect();
	
	$.when(
		$.get('/get/rooms'),
		$.get('/templates/rooms.html')
	).done(function(data, html){
		var rooms = data[0],
			roomList = Handlebars.compile(html[0]);
		
		$('#rooms').html(
			roomList(rooms)
		);
	});

	socket.on('update', function(connection){
		console.log(connection);
	});
});
