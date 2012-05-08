define(function(){
	return function(engine){
		engine.scene('home')
		.enter(function(){
			//default text color to white
			engine.c('text')
			.defines('textColor', '#fff')
			.requires('align');

			//prevent default for all keys used in game
			engine.preventDefault('left right up down');

			engine.e('text')
			.attr({
				font:		'30px sans-serif',
				text:		'Pong',
				alignHor:	0,
				alignVer:	-100
			});

			engine.e('text keyboard')
			.attr({
				text:		'Press z to start!',
				alignHor:	0,
				alignVer:	0
			})
			.on('keyup:z', function(){
				engine.scene('game').enter(false);
			})
			.on('keyup:x', function(){
				engine.scene('game').enter(true);
			});

			engine.e('text')
			.attr({
				text:		'Press x for two player',
				alignHor:	0,
				alignVer:	25
			});
		})
		.exit(function(){
			//remove all draw objects
			engine('draw').dispose();
		});
	};
});