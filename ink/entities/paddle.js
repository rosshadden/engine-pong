define(['./entity', 'engine/network', 'engine/draw'], function(Entity, network, draw){
	var Paddle = Entity.extend({
		init:	function(properties){
			this._super(properties);
			
			this.isAnimated = false;
			
			this.position = properties.position || {
				x:	0,
				y:	0
			};
			
			this.velocity = properties.velocity || {
				x:  4,
				y:  4
			};
			
			this.animation = [{
				x:			0,
				y:			0,
				w:			100,
				h:			100
			}];
			
			this.sprite.src = 'images/tiles/wall.jpg';
		},
		
		move:	function(dir){
			var self = this;
			
			self.position.y += self.velocity.y * dir;
			
			$(self).trigger('move-player.player', self.position);
			
			network.emit('move', self.position.y);
		},
		
		moveTo:	function(y){
			this.position.y = y;
		},
		
		draw:	function(){
			draw.sprite({
				src:		this.sprite,
				width:		this.dim.width,
				height:		this.dim.height,
				position:	this.position,
				sprite:		this.animation[this.spriteIndex]
			});
		}
	});
	
	return Paddle;
});
