define(['./entity', 'engine/draw'], function(Entity, draw){
	var Paddle = Entity.extend({
		init:	function(properties){
			this._super(properties);
			
			this.isAnimated = false;
			
			this.position = {
				x:	properties.position && properties.position.x || 0,
				y:	properties.position && properties.position.y || 0
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
			this.position.y += this.velocity.y * dir;
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
