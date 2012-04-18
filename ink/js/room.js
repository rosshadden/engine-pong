define(function(){
	$.when(
		$.get('/get/rooms'),
		$.get('/templates/rooms.html')
	).done(function(rooms, roomHTML){
		console.log(Handlebars);
	});
});
