define(function(){
	return function(engine){
		engine.c('ai')
		.requires('paddle update point net')
		.defines({
			update:	function(){
				var ball = engine('ball')[0];
				
				if(this.distance(ball.posX, this.posY) > 150){
					return;
				}
				
				if(ball.posY + ball.hsizeY > this.posY + this.hsizeY){
					this.posY += this.speed;
				}else if(ball.posY - ball.hsizeY < this.posY - this.hsizeX){
					this.posY -= this.speed;
				}
				
				this.checkBounds();
			}
		})
		.init(function(){
			var self = this;
			
			//self.on('update', self.update);
			
			self.bind('move', function(position){
				self.posY = position;
			});
		})
		.dispose(function(){
			this.off();
		});
	};
});