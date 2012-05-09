define(function(){
	return function(engine){
		engine.c('player')
		.requires('update paddle net')
		.defines({
			upKey:	'w',
			downKey:'s',
			
			update:	function(){
				if(engine.pressed(this.upKey)){
					this.posY -= this.speed;
					this.emit('move', this.posY);
				}else if(engine.pressed(this.downKey)){
					this.posY += this.speed;
					this.emit('move', this.posY);
				}
				
				this.checkBounds();
			}
		})
		.init(function(){
			this.on('update', this.update);
		});
	};
});