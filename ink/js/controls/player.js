define(function(){
	return function(engine){
		engine.c('player')
		.requires('update paddle')
		.defines({
			upKey:	'w',
			downKey:'s',
			
			update:	function(){
				if(engine.pressed(this.upKey)){
					this.posY -= this.speed;
				}else if(engine.pressed(this.downKey)){
					this.posY += this.speed;
				}
				
				this.checkBounds();
			}
		})
		.init(function(){
			this.on('update', this.update);
		});
	};
});