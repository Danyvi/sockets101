// establishing connection with the server

// socket for frontend (it is different fromthe one in the backend)
// we have access to it because we have it loaded in the html file with the socket.io CDN
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

// Emit an event(message) and send it on the websocket
// this will emit a message down the socket to the server,
// two parameters: 
// 1 name of the message ('chat' since it is a chat message), 
// 2 what the message is, the data that we are sending to the server. it is an obj
// message it is the value of the input field message (the var we declared top)
btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
});

// Listen for events

// we are listening for the chat message from the server
// with the data we can outputting them to the dom
socket.on('chat', data => {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});

// we are listening for the broadcast
socket.on('typing', data => {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message ...' + '</em></p>';
});