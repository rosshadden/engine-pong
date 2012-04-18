require.config({
	paths:	{
		'engine':	'/engine',
		'entities':	'/entities'
	}
});

require(['jquery'], function($){
	var route = (location.pathname.match(/\/\w*/) || ['/'])[0];
	
	console.log('route', route);
	
	switch(route){
		case '/':
			break;
			
		case '/room':
			require(['room'], function(room){
				console.log(room);
			});
			break;
			
		case '/game':
			require(['game'], function(game){
				//TEMP:	For debugging and experimentation.
				window.game = game;
				
				game.start();
			});
			break;
			
		default:
			console.log('route', 'default');
	}
});