define(['engine/network'], function(network){
	window.network = network;
	
	Handlebars.registerHelper('isOpen', function(count, options){
		if(count >= 0 && count < 2){
			return options.fn(this);
		}else{
			return options.inverse(this);
		}
	});
	
	var	roomsHTML;
	
	var	roomsHTMLRequest = $.get('/templates/rooms.html').done(function(html){
		roomsHTML = Handlebars.compile(html);
	});
	
	var	renderRooms = function(rooms){
		roomsHTMLRequest.done(function(){
			$('#rooms').html(
				roomsHTML(rooms)
			);
		});
	};
	
	network
	.connect()
	.on('update', renderRooms);
	
	$.get('/get/rooms').done(renderRooms);
});
