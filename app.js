////////////////////////////////////////////////////////////////
//	MODULES
var io,
	express = require('express'),
	routes = require('./routes');

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

//	Move this and /maps/* to ./engine.
app.get('/GET', function(request, response){
	var data = '',
		url = parseURL(request.url, true);
	
	response.contentType('application/json');
	
	switch(url.query.for){
		case 'debug':
			data = 'debug';
			break;
		default:
			data = 'default';
	}
	
	response.json(data);
});

app.get('/maps/:path', function(request, response){
	var map;
	
	try{
		map = require('./resources/maps/' + request.params.path + '.json');
	}catch(e){
		console.log('ERROR:', e);
		
		map = {
			error:	"The map you seek does not exist."
		};
	}
	
	response.contentType('application/json');
	
	response.json(map);
});

////////////////////////////////////////////////////////////////
//	RUN
app.listen(+(process.argv[2] || process.env.PORT || 3000));

console.log("%s:%d [%s]", app.address().address, app.address().port, app.settings.env);

////////////////////////////////////////////////////////////////
//	SERVE
io.sockets.on('connection', function(socket){
	console.log('Socket connected.');
});
