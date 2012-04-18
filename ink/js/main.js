require.config({
	baseUrl:	'../'
});

require(['jquery', 'js/game'], function($, game){
	//TEMP:	For debugging and experimentation.
	window.game = game;
});