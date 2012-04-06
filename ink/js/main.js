require.config({
	baseUrl:	'../'
});

require(['jquery', 'engine/engine'], function($, Engine){
	var	game = new Engine({
		init:	function(){},
		
		update:	function(){},
		
		paint:	function(){}
	});
	
	game.start();
});
