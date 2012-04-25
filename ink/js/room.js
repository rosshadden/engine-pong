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
	.on('update', renderRoom)
	.on('ready', function(id){
		$('#room').find('li[data-id="' + id + '"]').append('READY!');
		
		$('#start').prop('disabled', false);
	})
	.on('start', function(playerNum){
		console.log('STARTING GAME! You will be Player #' + playerNum + '.');
	});
	
	$.get('/get/rooms/' + roomName).done(renderRoom);
	
	$('#start').prop('disabled', true)
	.on('click', function(){
		network.emit('start');
	});
	
	$('#ready').on('click', function(){
		network.emit('ready');
		
		$('#start').prop('disabled', false);
		$('#ready').prop('disabled', true);
		
		$('#room').find('li[data-id="' + 0 + '"]').append(' [READY!]');
	});
});
