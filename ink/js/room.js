define(['engine/network'], function(network){
	window.network = network;

	var	roomHTML,
		roomName = location.pathname.match(/\/([0-9]+)$/)[1];
	
	var	roomHTMLRequest = $.get('/templates/room.html').done(function(html){
		roomHTML = Handlebars.compile(html);
	});
		
	var	renderRoom = function(room){
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
});
