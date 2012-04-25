define(['engine/network'], function(network){
	window.network = network;

	var	roomHTML,
		roomName = location.pathname.match(/\/([0-9]+)$/)[1];
	
	var	roomHTMLRequest = $.get('/templates/room.html').done(function(html){
		roomHTML = Handlebars.compile(html);
	});
		
	var	renderRoom = function(room){
		console.log('room', room);
		roomHTMLRequest.done(function(){
			$('#room').html(
				roomHTML(room)
			);
		});
	};
	
	network
	.connect()
	.on('update', renderRoom);
	
	$.get('/get/rooms/' + roomName).done(renderRoom);
	
	$('#start').prop('disabled', true)
	.on('click', function(){
		network.emit('start');
	});
	
	$('#ready').on('click', function(){
		network.emit('ready');
	});
});
