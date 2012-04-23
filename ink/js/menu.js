define(['engine/network'], function(network){
	network
	.connect()
	.on('testing', function(data){
		console.log('testing', data);
	});
	
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
});
