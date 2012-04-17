////////////////////////////////////////////////////////////////
//	MODULES
var	express = require('express'),
	routes = require('./routes'),
	
	app = module.exports = express.createServer(),
	engine = require('./engine/engine.js')(app);

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

app.get(/\/(join|host)/, function(request, response, next){
	var action = request.params[0];
	console.log(action, 'room');
	
	next();
});

app.get(/\/(join|host)/, routes.room);

app.get('game', routes.game);

////////////////////////////////////////////////////////////////
//	RUN
app.listen(+(process.argv[2] || process.env.PORT || 3000));

console.log("%s:%d [%s]", app.address().address, app.address().port, app.settings.env);

////////////////////////////////////////////////////////////////
//	SERVE
engine.network.start(function(socket){
	socket.on('move', function(y){
		socket.broadcast.emit('move', y);
	});
});
