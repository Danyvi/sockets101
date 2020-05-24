var express = require('express');
var socket = require('socket.io');

// App Setup
var app = express();
var server = app.listen(4000, () => console.log('listening for request on port 4000'));

// Static files
app.use(express.static('public'))

// Socket setup: we want socket.io work with server 'server'
var io = socket(server);

// we call a allback function when a connection is established
// we have to listen for the message sent from the client (the 'chat' message)
io.on('connection', socket => {
    console.log('Made socket connection ', socket.id);
    // we are referring to the socket between the server and the particular client
    // that is sending the message
    // when we are receiving the 'chat' message we fire a callback function
    // we want to send the data to all the other clients connected to the socket 
    // so that everyone in the chatroom can see the message
    // 'io.sockets' is referring to all the sockets connected to the server
    // .emit a message to everyone of those
    // we have to say what kind of message we're sending back to the clients
    // we are sending the 'data' we received from the first client
    socket.on('chat', data => {
        io.sockets.emit('chat', data)
    });

    socket.on('typing', data => {
        socket.broadcast.emit('typing', data)
    })
})

// Broadcast is sending from the server to all the clients except the one that originated the message