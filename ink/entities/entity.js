define(['engine/lib/class', 'engine/world'], function(Base, world){
	var Entity = Base.extend({
		init:	function(properties){
			var self = this;
			
			self.name = properties.name;
			
			self.isAnimated = false;
			
			self.dim = {
				width:	world.cell.width,
				height:	world.cell.height
			};
			
			self.sprite = new Image();
			self.spriteIndex = 0;
			
			self.currentFrame = 0;
		}
	});
	
	return Entity;
});
