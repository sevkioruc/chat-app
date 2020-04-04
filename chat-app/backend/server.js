const express = require('express')
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const port = process.env.PORT || 3000;

const server = http.Server(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    roomName = '';
    socket.on('join-room', (data) => {
        socket.join(data.room.name, () => {
            io.to(data.room.name).emit('new-joined-user', `${data.user} joined`);
            roomName = data.room.name;
        });
    });

    socket.on('send-message', (data) => {
        io.to(roomName).emit('broadcast-message-by-server', data);
    });

    socket.on('disconnect', () => {
        console.log('User logged out');
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
