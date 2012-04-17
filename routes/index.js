exports.index = function(request, response){
	if(/^\d$/.test(request.params.room)){
		console.log('room', request.params.room);
	}
	
	response.render('index', {
		title:	'Engine'
	});
};
