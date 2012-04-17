exports.index = function(request, response){
	response.render('index', {
		title:	'Main Menu'
	});
};

exports.room = function(request, response){
	if(/^\d$/.test(request.params.room)){
		console.log('room', request.params.room);
	}
	
	response.render('room', {
		title:	'Room'
	});
};

exports.game = function(request, response){
	response.render('game', {
		title:	'Game'
	});
};