require.config({
	baseUrl:	'../'
});

require(['jquery', 'engine/engine', 'entities/paddle', 'entities/ball', 'entities/score'], function($, Engine, Paddle, Ball, Score){
	var	game = new Engine({
		screen:	$('#screen')[0],
		
		map:	'board',
		
		init:	function(){
			var self = this;

			self.world.createEntity(Paddle, {
				name:       'playerOne',
				position:   self.world.toXY(1, 6),
				velocity: {
					x:  0,
					y:  16
				}
			});
			
			self.world.createEntity(Paddle, {
				name:       'playerTwo',
				position:   self.world.toXY(22, 6)
			});
			
			self.world.createEntity(Ball, {
				name:		'ball',
				position:	self.world.toXY(10, 6),
				interval:	4
			});
			
			self.world.createEntity(Score, {
				name:	'playerOneScore',
			});
			
			self.world.createEntity(Score, {
				name:	'playerTwoScore',
				align:	'right',
				position: {
					x:	600,
					y:	0
				}
			});

			//TODO:	Come up with a more streamlined way to add resources on init.
			self.resources.add('intro', 'sounds/intro.wav')
			.done(function(sound){
				sound.play();
			});
			
			self.resources.add('hit', 'sounds/boing.wav');
			self.resources.add('click', 'sounds/click.wav');
			self.resources.add('clap', 'sounds/applause.wav');
		},
		
		update:	function(){
			var self = this,
				keys = this.input.keyboard.activeKeys();
			
			if(keys.length > 0){
				if(keys.indexOf('w') > -1 || keys.indexOf('comma') > -1){
					self.world.entities.playerOne.move(-1);
				}
				
				if(keys.indexOf('s') > -1 || keys.indexOf('o') > -1){
					self.world.entities.playerOne.move(1);
				}
				
				if(keys.indexOf('up') > -1){
					self.world.entities.playerTwo.move(-1);
				}
				
				if(keys.indexOf('down') > -1){
					self.world.entities.playerTwo.move(1);
				}
			}
			
			self.world.entities.ball.update(
				self.world.entities.playerOne,
				self.world.entities.playerTwo
			);
		},
		
		paint:	function(){}
	});
			
	game.events.on('win', function(event, player){
		game.resources.get('sound/clap').play();
		
		game.end()
		.done(function(){
			game.utilities.log.add(player + ' won the game!');
		});
	});

	window.game = game;
	
////////////////////////////////
//	DEBUGGING
	//	Animation
	game.bind.key('z', function(){
		game.world.entities.ball.stop();
		console.log('LOG:','ball animation stopped.');
	});
	
	game.bind.key('x', function(){
		game.world.entities.ball.play();
		console.log('LOG:','ball animation started.');
	});
	
	//	Logging
	game.bind.key('l', function(){
		game.utilities.log.add('Testing the new logger.');
	});
	
	game.bind.key('shift + l', function(){
		game.utilities.log.clear();
	});
	
	//	Keys
	game.bind.key('shift + graveaccent', function(){
		console.log(game.input.keyboard.activeKeys());
	});

////////////////////////////////
//	RUN	
	game.start();
});
