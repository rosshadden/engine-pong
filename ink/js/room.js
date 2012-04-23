define(['engine/network'], function(network){
	var room = location.pathname.match(/\/([0-9]+)$/)[1];

	network.connect();
	
	$.get('/get/rooms/' + room, function(data){
		var playerList = '';
		
		$('#count').text(data.count);

		data.players.forEach(function(player, p){
			playerList += '<li>' + player + '</li>';
		});
		
		$('#list').html(playerList);
	});

	network.on('update', function(data){
		console.log('update', data);
	});
});
