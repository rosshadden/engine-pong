define([
	'./ai',
	'./arena',
	'./hitmap',
	'./player',
	'./twoarena'
], function(ai, arena, hitmap, player, twoarena){
	return function(engine){
		ai(engine);
		arena(engine);
		hitmap(engine);
		player(engine);
		twoarena(engine);
	};
});