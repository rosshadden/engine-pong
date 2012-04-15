////////////////////////////////////////////////////////////////
//	MODULES
var io,
	express = require('express'),
	routes = require('./routes'),
	//TODO:	require entire engine directory, or just ./engine/engine.js.
	engine = require('./engine/engine.js');

var app = module.exports = express.createServer(),
	io = require('socket.io').listen(app);

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
	app.use(express.static(__dirname + '/ink'));
	
	io.set('log level', 1);
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

for(var route in engine.router){
	app.get(route, engine.router[route]);
}

////////////////////////////////////////////////////////////////
//	RUN
app.listen(+(process.argv[2] || process.env.PORT || 3000));

console.log("%s:%d [%s]", app.address().address, app.address().port, app.settings.env);

////////////////////////////////////////////////////////////////
//	SERVE
io.sockets.on('connection', function(socket){
	console.log('Socket connected.');
});
