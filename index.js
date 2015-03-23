var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var usersConnected = 0;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	usersConnected++;
	console.log('Usuarios conectados: ' + usersConnected);
	socket.on('chat message', function(msg){
		console.log('message --> ' + msg);
		io.emit('chat message', msg);
	});
	socket.on('disconnect', function(){
	    console.log('user disconnected');
	    usersConnected--;
	});
});

http.listen(1337, function(){
	console.log('listening on http://localhost:3000/');
});