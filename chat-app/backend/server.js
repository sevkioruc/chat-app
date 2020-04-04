const express = require('express')
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const port = process.env.PORT || 3001;

const server = http.Server(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    socket.on('join-room', (data) => {
        socket.join(data.room.name, () => {
            io.to(data.room.name).emit('new-joined-user', `${data.user} joined`);
        });
    });

    socket.on('leave-room', (data) => {
        socket.leave(data.room.name, () => {
            io.to(data.room.name).emit('leaved-user', `${data.user} leaved`);
        });
    });

    socket.on('send-message', (data) => {
        io.to(data.room.name).emit('broadcast-message-by-server', data.message);
    });

    socket.on('disconnect', () => {
        console.log('User logged out');
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
