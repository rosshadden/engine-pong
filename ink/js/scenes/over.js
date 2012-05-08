define(function(){
	return function(engine){
		engine.scene('over')
		.enter(function(message){
			engine.e('text')
			.attr({
				font:		'30px sans-serif',
				text:		message,
				alignVer:	-60,
				alignHor:	0
			})

			engine.e('text keyboard')
			.attr({
				text:		'Press Z to continue',
				alignVer:	-20,
				alignHor:	0
			})
			.on('keyup:z', function(){
				engine.scene('home').enter();
			});
		})
		.exit(function(){
			engine('text').dispose();
		});
	};
});