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
	
	game.bind.key('l', function(){
		game.utilities.log.add('Testing the new logger.');
	});
	
	game.bind.key('shift + l', function(){
		game.utilities.log.clear();
	});
	
////////////////////////////////
//	DEBUGGING
	game.bind.key('shift + graveaccent', function(){
		console.log(game.input.keyboard.activeKeys());
	});
////////////////////////////////
	
	game.start();
});
