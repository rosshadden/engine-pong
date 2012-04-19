////////////////////////////////////////////////////////////////
//	MODULES
var	express = require('express'),
	routes = require('./routes'),
	
	app = module.exports = express.createServer(),
	engine = require('./engine/engine.js')(app);

////////////////////////////////////////////////////////////////
//	GAME STUFF
	var players = {},
		rooms = [];

////////////////////////////////////////////////////////////////
//	CONFIG
app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({secret: 'Shh... it is a secret!'}));
	app.use(require('stylus').middleware({
		src:	__dirname + '/ink'
	}));
	app.use(app.router);
	app.use('/engine', express.static(__dirname + '/engine/client'));
	app.use(express.static(__dirname + '/ink'));
});

app.configure('development', function(){
	app.use(express.errorHandler({
		dumpExceptions:	true,
		showStack:		true
	}));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

////////////////////////////////////////////////////////////////
//	ROUTES
app.get('/', routes.index);

app.get('/host', function(request, response, next){
	var room;
	
	for(room = 0 ;; room++){
		if(!rooms[room] || rooms[room].players === 0){
			break;
		}
	}
	
	if(!rooms[room]){
		rooms[room] = {
			id:			room,
			players:	0
		};
	}
	
	response.redirect('/room/' + room);
});

app.get('/room/:room([0-9]+)', function(request, response, next){
	var room = request.params.room;
	
	if(rooms[room].players < 2){
		rooms[room].players += 1;
		
		next();
	}else{
		response.redirect('/');
	}
	
	console.log(room, rooms[room]);
});

app.get('/room/:room([0-9]+)', routes.room);

app.get('/game', routes.game);

app.get('/get/rooms', function(request, response){
	response.json(rooms);
});

////////////////////////////////////////////////////////////////
//	RUN
app.listen(+(process.argv[2] || process.env.PORT || 3000));

console.log("%s:%d [%s]", app.address().address, app.address().port, app.settings.env);

////////////////////////////////////////////////////////////////
//	SERVE
engine.network.start(function(socket){
	var id = socket.id;

	players[id] = {
		socket:	socket
	};
	
	app.get('/test', function(request, response){
		response.redirect('/game');
	});
	
	socket.on('move', function(y){
		socket.broadcast.emit('move', y);
	});
});
