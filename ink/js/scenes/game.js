define(function(){
	return function(engine){
		engine.scene('game')
		.enter(function(twoPlayer){
			engine.hitmap = engine.e('hitmap');

			//setup counters

			//counter for player 1
			var p1 = engine.e('counter')
			.alignHor(40)
			.on('max', function(){
				var message = 'You win!';
				if(twoPlayer) message = 'Player 1 wins!';

				engine.scene('over').enter(message);
			});

			//counter for player 2
			var p2 = engine.e('counter')
			.alignHor(-60)
			.on('max', function(){
				var message = 'You lose!';

				if(twoPlayer) message = 'Player 2 wins!';

				engine.scene('over').enter(message);
			});

			//setup arena playing field
			var arena = engine.e((twoPlayer) ? 'twoarena' : 'arena');

			//setup hitmap
			engine.hitmap
			.on('score:left', function(){
				arena.restartRound();
				p1.up();
			})
			.on('score:right', function(){
				arena.restartRound();
				p2.up();
			});

			//exit game
			engine.e('keyboard')
			.on('keyup:q', function(){
				engine.scene('home').enter();
			});

			//start game
			arena.startRound();
		})
		.exit(function(){
			engine('arena').dispose();
			engine('counter').dispose();

			engine.hitmap.dispose();
			delete engine.hitmap;
		});
	};
});