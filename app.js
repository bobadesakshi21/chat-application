const path = require('path')
const express = require('express')

const app = express()

const server = app.listen(3000, () => {
  console.log('Server is up and running`')
})

const io = require('./socket').init(server)

io.on('connection', socket => {
  // Welcome current user
  socket.emit('message', 'Welcome Here')

  // Broadcast when a new user connects
  socket.broadcast.emit('message', 'A user has joined the chat')

  // Runs when the client disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat')
  })

  // Listen for chat message
  socket.on('chat-message', message => {
    io.emit('message', message)
  })
})

app.use(express.static(path.join(__dirname, 'public')))
