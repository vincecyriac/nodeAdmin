module.exports = {
    uiSocket: (io) => {
        // Listen for new connection
        io.on('connection', (socket) => {
            console.log(`New connection ${socket.id}`)
            //join room
            socket.on('join', (data) => {
                socket.join(data.room);
                io.to(data.room).emit('getUpdates', `${data.user} joined ${data.room}`);
            });
            //emit to particular room
            socket.on('newUpdate', (data) => {
                console.log("new updatesss")
                io.to(data.room).emit('getUpdates', data.msg);
            });
            //leave room 
            socket.on('leave', (data) => {
                socket.leave(data.room);
                io.to(data.room).emit('getUpdates', `${data.user} left ${data.room}`);
            });
        });
    },
}