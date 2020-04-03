const express = require('express')
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const port = process.env.PORT || 3000;

const server = http.Server(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    socket.on('join-room', (data) => {
        socket.join(data.room.name, () => {
            io.to(data.room.name).emit('new-joined-user', `${data.user} joined`)
        });
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
