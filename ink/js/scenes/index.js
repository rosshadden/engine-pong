define([
	'./home',
	'./game',
	'./over'
], function(home, game, over){
	return function(engine){
		home(engine);
		game(engine);
		over(engine);
	};
});