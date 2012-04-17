exports.index = function(request, response){
	response.render('index', {
		title:	'Engine'
	});
};

exports.room = function(request, response){
	if(/^\d$/.test(request.params.room)){
		console.log('room', request.params.room);
	}
	
	console.log('room');
	
	response.render('index', {
		title:	'ROOM'
	});
};