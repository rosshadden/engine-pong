define(function(){
	return function(engine){
		engine.c('ball')
		.requires('rect align force limit')
		.defines({
			color:	'#fff',
			sizeX:	6,
			sizeY:	6,

			hsizeX:	3,
			hsizeY:	3,

			regX:	3,
			regY:	3,

			resX:	1.1,
			resY:	1.1,

			friX:	1,
			friY:	1,

			initVel:4,

			reset:	function(){
				this.alignHor();
				this.alignVer();
				this.velX = engine.random(this.initVel * 0.5, this.initVel) * engine.random([-1, 1]);
				this.velY = engine.random(this.initVel * 0.5, this.initVel) * engine.random([-1, 1]);
			}
		});
	};
});