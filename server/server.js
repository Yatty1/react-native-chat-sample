const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().now
  }
}
const isValidString = (str) => {
  return typeof str === 'string' && str.trim().length > 0;
}

io.on('connection', (socket) => {
  socket.on('join', (params, callback) => {
    if (!isValidString(params.name) || !isValidString(params.room)) {
      return callback('Name and Room is required');
    }
    socket.join(params.room);
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });

  socket.on('openRoom', () => {
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat'));
  })

  socket.on('createMessage', (message) => {
    io.to(message.room).emit('newMessage', generateMessage(message.from, message.text));
  });

  socket.on('disconnect', () => console.log('disconnected'));
});

server.listen(3000, () => {
  console.log(`Started up at 3000`);
});