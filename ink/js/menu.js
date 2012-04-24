define(['engine/network'], function(network){
	window.network = network;
	
	network
	.connect()
	.on('update', function(data){
		console.log('updating', data);
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
