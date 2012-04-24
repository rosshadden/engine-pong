define(['engine/network'], function(network){
	window.network = network;

	var room = location.pathname.match(/\/([0-9]+)$/)[1];
	
	network
	.connect()
	.on('update', function(data){
		console.log('updating', data);
		var playerList = '';
		
		$('#count').text(data.count);

		data.players.forEach(function(player, p){
			playerList += '<li>' + player + '</li>';
		});
		
		$('#list').html(playerList);
	});
});
