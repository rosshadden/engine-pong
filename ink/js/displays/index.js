define([
	'./ball',
	'./counter',
	'./paddle'
], function(ball, counter, paddle){
	return function(engine){
		ball(engine);
		counter(engine);
		paddle(engine);
	};
});