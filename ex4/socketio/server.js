var io = require('socket.io')();

io.on('connection', (client) => {
    console.log('connected');

    //Whenever someone disconnects this piece of code executed
    socket.on('update', function () {
        console.log('A user disconnected');
    });

});

io.listen(3000);