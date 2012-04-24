define(['engine/network'], function(network){
	window.network = network;
	
	var roomList,
		
		roomRequest = $.get('/templates/rooms.html').done(function(html){
			roomList = Handlebars.compile(html);
		}),
		
		renderRooms = function(data){
			$('#rooms').html(
				roomList(data)
			);
		};
	
	network
	.connect()
	.on('update', function(rooms){
		roomRequest.done(function(){
			renderRooms(rooms)
		});
	});
	
	$.when(
		$.get('/get/rooms'),
		roomRequest
	).done(function(data){
		renderRooms(data[0])
	});
});
