const io = require('socket.io')(3000)

const users = {}
io.on('connection'), socket => {
    socket.emit('welcome message', 'Long time no see!')
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.bradcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-messsage', { name: users[socket.id], message })
    })
    socket.on('disconnect', () => {
        socket.bradcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})