require.config({
	paths:	{
		'engine':	'/engine',
		'entities':	'/entities'
	}
});

require(['jquery'], function($){
	var route = (location.pathname.match(/\/\w*/) || ['/'])[0];
	
	switch(route){
		case '/':
			require(['menu']);
			break;
			
		case '/room':
			require(['room']);
			break;
			
		case '/game':
			require(['game'], function(game){
				//TEMP:	For debugging and experimentation.
				window.game = game;
				
				game.start();
			});
			break;
	}
});