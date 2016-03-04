var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket_io')(http);

app.get('/', function(req, res) {
  res.sendfile('client.html');
});

var count = 1;
io.on('connection', function(socket) {
  console.log('user connected: ', socket.id);
  var name = 'user' + count++;
  //emit 은 event를 서버에서 클라이언트로 전달
  // event를 한명한테만 전달
  io.to(socket.id).emit('change name', name);
  // evnet를 보낸놈 빼고 다 전달
  //socket.broadcast.emit('event', object);

  socket.on('disconnect', function() {
    console.log('user disconnected: ', socket.id);
  });

  socket.on('send message', function(name, text) {
    var msg = name + ' : ' + text;
    console.log(meg);
    io.emit('receive message', msg);
  });
});

http.listen('8080', function() {
  console.log('server on!');
});
