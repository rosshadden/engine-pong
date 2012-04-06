require.config({
	baseUrl:	'../'
});

require(['jquery', 'engine/engine'], function($, Engine){
	var	game = new Engine({
		screen:	$('#screen')[0],
		
		map:	'board',
		
		init:	function(){},
		
		update:	function(){},
		
		paint:	function(){}
	});
	
////////////////////////////////
//	DEBUGGING
	game.bind.key('shift + graveaccent', function(){
		console.log(game.input.keyboard.activeKeys());
	});
////////////////////////////////
	
	game.start();
});
