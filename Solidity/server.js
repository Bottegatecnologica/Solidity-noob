const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Array per tenere traccia delle stanze e dei partecipanti
const rooms = {};

io.on('connection', (socket) => {
    socket.on('joinRoom', (roomNumber) => {
        if (!rooms[roomNumber]) {
            rooms[roomNumber] = [];
        }

        if (rooms[roomNumber].length < 2) {
            rooms[roomNumber].push(socket.id);
            socket.join(roomNumber);
        } else {
            // La stanza è piena
            socket.emit('roomFull');
        }
    });

    socket.on('initiateTrade', (data) => {
        // Implementa la logica per iniziare uno scambio
        // e invia i dati a entrambi i partecipanti
        io.to(data.roomNumber).emit('tradeInitiated', data);
    });

    socket.on('confirmTrade', (data) => {
        // Implementa la logica per confermare uno scambio
        // e invia i dati a entrambi i partecipanti
        io.to(data.roomNumber).emit('tradeConfirmed', data);
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
