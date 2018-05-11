const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const { Users } = require('user');
const users = new Users();

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
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });

  socket.on('openRoom', () => {
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat'));
  })

  socket.on('createMessage', (message) => {
    const user = users.getUser(socket.id);
    if (user && isValidString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text)); // emit to every sing user connected
    }
  });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

server.listen(3000, () => {
  console.log(`Started up at 3000`);
});