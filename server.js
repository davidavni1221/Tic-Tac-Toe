const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3030

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');

  });
  socket.on('turn',(cell)  => {
    console.log('cell',cell);
    socket.broadcast.emit('recive-turn',cell)
    
  });
});

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);

});