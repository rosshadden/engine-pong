////////////////////////////////////////////////////////////////
//	MODULES
var	PORT = +(process.argv[2] || process.env.PORT || 3000),
	express = require('express'),
	routes = require('./routes'),
	app = express(),
	server = require('http').createServer(app);

	app.session = new express.session.MemoryStore;
	app.io = require('socket.io').listen(server);
	
var	engine = require('./engine/engine.js')(app);

////////////////////////////////////////////////////////////////
//	GAME STUFF
	var rooms = [];

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
	app.use(express.session({
		key:	'engine',
		store:	app.session
	}));
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
var authenticate = function(request, response, next){
//	if(request.sessionID in engine.players.players){
//		next();
//	}else{
		//response.send('SUCKS!', 404);
		next();
//	}
};

app.get('/', function(request, response, next){
	var id = request.sessionID;
	
	if(engine.players.get(id)){
		engine.network.with(id).join('menu').leave(/^room\d+$/);
	}else{
		engine.events.emitter.once('created-' + id, function(){
			engine.network.with(id).join('menu').leave(/^room\d+$/);
		});
	}
	
	next();
}, routes.index);

app.get('/host', authenticate, function(request, response){
	var room;
	for(room = 0 ;; room++){
		if(!rooms[room] || rooms[room].count === 0){
			break;
		}
	}
	
	if(!rooms[room]){
		rooms[room] = {
			id:		room,
			count:	0,
			players:[]
		};
	}
	
	response.redirect('/room/' + room);
});

app.get('/room/:room([0-9]+)', authenticate, function(request, response, next){
	var id = request.sessionID,
		room = request.params.room,
		isPresent = rooms[room].players.indexOf(id) > -1;

	if(rooms[room].count < 2 || isPresent){
		if(!isPresent){
			rooms[room].count += 1;
			rooms[room].players.push(id);
		}
		
		engine.network.with(id).join('room' + room).leave('menu');
		engine.network.in('room' + room).emit('update', rooms[room]);
		engine.network.in('menu').emit('update', rooms);
		
		console.log('Player %s joined room #%d.', id, room);
		
		next();
	}else{
		response.redirect('/');
	}
}, routes.room);

app.get('/game', routes.game);

//	AJAX
app.get('/get/rooms/:room?', authenticate, function(request, response){
	var room = request.params.room;
	
	if(room){
		response.json(rooms[room]);
	}else{
		response.json(rooms);
	}
});

app.get('/maps/:path', authenticate, function(request, response){
	try{
		var map = require('./resources/maps/' + request.params.path + '.json');
		
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
	//	ROUTES
/*
	socket.on('move', function(y){
		socket.broadcast.emit('move', y);
	});
*/
