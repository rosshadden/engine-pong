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
		$('#room').find('li[data-id="' + id + '"]').addClass('ready');
		
		if($('#room').find('li').length === $('#room').find('li.ready').length){
			$('#start').prop('disabled', false);
		}
	})
	.on('start', function(playerNum){
		$('#start').prop('disabled', true);
		
		console.log('STARTING GAME! You will be Player #' + playerNum + '.');
	});
	
	$.get('/get/rooms/' + roomName).done(renderRoom);
	
	$('#start').prop('disabled', true)
	.on('click', function(){
		network.emit('start');
		
		$(this).prop('disabled', true);
	});
	
	$('#ready').on('click', function(){
		network.emit('ready');
		
		$(this).prop('disabled', true);
	});
});
