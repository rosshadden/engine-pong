define(['engine/network'], function(network){
	window.network = network;

	var	roomHTML,
		roomName = location.pathname.match(/\/([0-9]+)$/)[1];
	
	var	roomHTMLRequest = $.get('/templates/rooms.html').done(function(html){
		roomHTML = Handlebars.compile(html);
	});
		
	var	renderRoom = function(room){
		roomHTMLRequest.done(function(){
			var playerList = '';
			
			$('#count').text(room.count);

			room.players.forEach(function(player, p){
				playerList += '<li>' + player + '</li>';
			});
			
			$('#list').html(playerList);
		});
	};
	
	network
	.connect()
	.on('update', renderRoom);
	
	$.get('/get/rooms/' + roomName).done(renderRoom);
});
