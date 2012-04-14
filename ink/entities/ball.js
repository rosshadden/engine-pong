define(['./entity', 'engine/draw', 'engine/collision', 'engine/audio', 'engine/resources', 'engine/events'], function(Entity, draw, collision, audio, resources, events){
	var Ball = Entity.extend({
		init:	function(properties){
			this._super(properties);
			
			var self = this;
			
			self.isAnimated = true;
			self.isAnimating = true;
			
			self.dim = {
				width:	50,
				height:	50
			};
			
			self.position = properties.position || {
				x:	0,
				y:	0
			};
			
			self.initialPosition = {};
			self.initialPosition.x = self.position.x;
			self.initialPosition.y = self.position.y;
			
			self.velocity = properties.velocity || {
				x:  4,
				y:  4
			};
			
			self.direction = {
				x:	1,
				y:	0.5
			};
			
			self.sprite.src = 'images/tiles/circle.png';
			self.spriteIndex = 0;
			
			self.animation = [{
				x:			0,
				y:			0,
				w:			100,
				h:			100
			},{
				x:			100,
				y:			0,
				w:			100,
				h:			100
			},{
				x:			200,
				y:			0,
				w:			100,
				h:			100
			},{
				x:			300,
				y:			0,
				w:			100,
				h:			100
			}];
			
			self.currentFrame = 0;
			self.interval = 0;
			
			self.interval = (function(interval){
				var output;
				if(typeof interval === 'number'){
					output = function(frame){
						return frame === interval;
					};
				}else if(typeof interval === 'boolean'){
					output = function(){
						return interval;
					};
				}else if(typeof interval === 'function'){
					output = interval;
				}
				return output;
			})(properties.interval || 4);
			
			self.sequence = (function(sequence){
				var output = [];
				if(typeof sequence === 'object' && sequence instanceof Array){
					output = sequence;
				}else{
					for(i in self.animation){
						output[i] = i;
						if(sequence === 'oscillate' && i !== '0'){
							output[2 * self.animation.length - i - 2] = i;
						}
					}
				}
				return output;
			})(properties.sequence || 'linear');

			events.listen('collision.ball', function(){
				resources.get('sound/click').play();
			});
		},
		
		update:	function(playerOne, playerTwo){
			var self = this;
			
			if(collision.rectangle(self, playerOne) || collision.rectangle(self, playerTwo)){
				self.direction.x = -1 * self.direction.x;
				
				events.emit('collision.ball');
			}
			
			if(collision.wall(self, 'left')){
				self.direction.x = -1 * self.direction.x;
				
				events.emit('score.playerTwo');
				events.emit('collision.ball');
			}
			
			if(collision.wall(self, 'right')){
				self.direction.x = -1 * self.direction.x;
				
				events.emit('score.playerOne');
				events.emit('collision.ball');
			}
			
			if(collision.wall(self, 'top') || collision.wall(self, 'bottom')){
				self.direction.y = -1 * self.direction.y;
				
				events.emit('collision.ball');
			}
			
			self.move(
				self.direction.x,
				self.direction.y
			);
		},
		
		move:	function(x, y){
			this.position.x += this.velocity.x * x;
			this.position.y += this.velocity.y * y;
		},
		
		moveTo:	function(x, y){
			this.position.x = x;
			this.position.y = y;
		},
		
		draw:	function(){
			draw.sprite({
				src:		this.sprite,
				width:		this.dim.width,
				height:		this.dim.height,
				position:	this.position,
				sprite:		this.animation[this.sequence[this.spriteIndex]]
			});
			
			if(this.isAnimating && this.interval(this.currentFrame)){
				this.spriteIndex = (this.spriteIndex + 1) % this.sequence.length;
				this.currentFrame = 0;
			}else if(!this.isAnimating){
				this.currentFrame = 0;
			}
			
			this.currentFrame++;
		},
		
		play:	function(){
			this.isAnimating = true;
		},
		
		stop:	function(){
			this.isAnimating = false;
		}
	});
	
	return Ball;
});
