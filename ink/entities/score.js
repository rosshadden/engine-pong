define(['./entity', 'engine/draw'], function(Entity, draw){
	var Score = Entity.extend({
		init:	function(properties){
			this._super(properties);
			
			this.position = properties.position || {
				x:	0,
				y:	0
			};
			
			this.score = 0;
			
			this.align = properties.align;
		},
		
		add:	function(x){
			this.score += x || 1;
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
