define(function(){
	return function(engine){
		engine.c('arena')
		.defines({
			startRound:	function(){
				this.ball = engine.e('ball');
				this.ball.reset();
			},
			
			stopRound:	function(){
				//reset players
				if(this.ball) this.ball.dispose();
				return this;
			},
			
			restartRound:	function(){
				this.stopRound();
				this.startRound();
			}
		})
		.init(function(){
			//player
			engine.e('player').alignRight(-10);
		  
			//ai or player 2
			this.paddle2 = engine.e('paddle ai');
		})
		.dispose(function(){
			engine('paddle').dispose();
			this.stopRound();
		});
	};
});