define(function(){
	return function(engine){
		engine.c('twoarena')
		.requires('arena')
		.init(function(){
			//remove ai and add player controls
			this.paddle2
			.removeComp('ai')
			.comp('player')
			.attr({
				upKey:	'up',
				downKey:'down'
			});
		});
	};
});