////////////////////////////////////////////////////////////////
//	MODULES
var	PORT = +(process.argv[2] || process.env.PORT || 3000),
	express = require('express'),
	routes = require('./routes'),
	app = express(),
	server = require('http').createServer(app);
	
	app.io = require('socket.io').listen(server);
	
var	engine = require('./engine/engine.js')(app);

////////////////////////////////////////////////////////////////
//	GAME STUFF
	var players = {},
		rooms = [],
		numPlayers = 0;

////////////////////////////////////////////////////////////////
//	CONFIG
app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	//app.use(express.logger('dev'));
	app.use(require('stylus').middleware({
		src:	__dirname + '/ink'
	}));
	app.use(express.static(__dirname + '/ink'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser("Shhh... it's a secret!"));
	app.use(express.session());
	app.use(app.router);
	
	app.io.set('log level', 1);
	
	//TODO:	Move this to engine.js.
	app.use('/engine', express.static(__dirname + '/engine/client'));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

////////////////////////////////////////////////////////////////
//	ROUTES
app.get('/', function(request, response, next){
	//console.log('session', request.user);
	
	next();
}, routes.index);

app.get('/engine/*', function(request, response, next){
	next();
});

app.get('/maps/:path', function(request, response){
	try{
		var map = require('../../resources/maps/' + request.params.path + '.json');
		
		response.json(map);
	}catch(e){
		console.log('Error: A client tried to access map "%s".', request.params.path);
		response.send('The map you seek does not exist.', 404);
	}
});

////////////////////////////////////////////////////////////////
//	RUN
server.listen(PORT);

console.log("Server started on port %d [%s]", PORT, app.settings.env);

////////////////////////////////////////////////////////////////
//	SERVE
/*app.io.sockets.on('connection', function(socket){
	var id = socket.id;
	
	console.log(id in players);
	players[id] = {
		id:		id,
		socket:	socket
	};
	
	console.log('Player #%d connected.', ++numPlayers);
	
	//	ROUTES
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
			
			socket.join('room-' + room);
			
			console.log('Player %s joined room #%d.', id, room);
			
			next();
		}else{
			response.redirect('/');
		}
	}, routes.room);
	
	app.get('/game', routes.game);
	
	//	AJAX
	app.get('/get/rooms', function(request, response){
		response.json(rooms);
	});
	
	socket.on('move', function(y){
		socket.broadcast.emit('move', y);
	});
});
*/