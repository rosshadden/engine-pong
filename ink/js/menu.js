define(['engine/network'], function(network){
	window.network = network;
	
	var roomList,
		roomRequest = $.get('/templates/rooms.html');
	
	network
	.connect()
	.on('update', function(rooms){
		console.log('updating', rooms);
		roomRequest.done(function(){
			$('#rooms').html(
				roomList(rooms)
			);
		});
	});
	
	$.when(
		$.get('/get/rooms'),
		roomRequest
	).done(function(data, html){
		var rooms = data[0];
		
		roomList = Handlebars.compile(html[0]);
		
		$('#rooms').html(
			roomList(rooms)
		);
	});
});
