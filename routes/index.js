exports.index = function(request, response){
	response.render('index', {
		title:	'Main Menu'
	});
};

exports.room = function(request, response){
	response.render('room', {
		title:	'Room',
		room:	request.params.room
	});
};

exports.game = function(request, response){
	response.render('game', {
		title:	'Game'
	});
};
