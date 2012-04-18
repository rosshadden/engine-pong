define(function(){
	$.when(
		$.get('/get/rooms'),
		$.get('/templates/rooms.html')
	).done(function(data, html){
		var rooms = data[0],
			roomList = Handlebars.compile(html[0]);
		
		console.log(rooms, roomList(rooms));
		
		$('#rooms').html(
			roomList(rooms)
		);
	});
});
