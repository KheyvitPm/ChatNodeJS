var express = require("express");
var app = express();
var port = 8080;

app.use(express.static(__dirname + "/public"));

app.set('views', __dirname + '/views');
app.set('view engine', "jade");
app.engine('jade', require("jade").__express);

app.get("/", function(req, res){
	res.render('pagina');
});


var io = require('socket.io').listen(app.listen(port));


io.sockets.on('connection', function(socket){
	//Conecto al chat
	socket.emit("message", {message: "Bienvenido al chat."});

	socket.on('send', function(data){
		io.sockets.emit('message', data);
	});
});

console.log("Listening on port " + port);