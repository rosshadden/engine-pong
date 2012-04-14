define(['./entity', 'engine/draw', 'engine/events'], function(Entity, draw, events){
	var Score = Entity.extend({
		init:	function(properties){
			var self = this;
			
			self._super(properties);
			
			self.position = properties.position || {
				x:	0,
				y:	0
			};
			
			self.score = 0;
			
			self.align = properties.align;

			events.on('score.' + self.name.slice(0, -5), function(event){
				self.add();
			});
		},
		
		add:	function(x){
			this.score += x || 1;
			
			if(this.score === 10){
				events.emit('win', this.name.slice(0, -5));
			}
		},
		
		draw:	function(){
			var self = this;
			
			draw.text({
				text:	self.score,
				align:	self.align,
				x:		self.position.x,
				y:		self.position.y
			});
		}
	});
	
	return Score;
});
