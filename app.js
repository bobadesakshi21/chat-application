const path = require('path')
const express = require('express')
const formatMessage = require('./utils/messages')
const { userJoin, getCurrentUser } = require('./utils/users')

const app = express()

const server = app.listen(3000, () => {
  console.log('Server is up and running`')
})

const io = require('./socket').init(server)
const bot = 'Chat App'

io.on('connection', socket => {
  // Joining the room
  socket.on('join-room', ({ username, room }) => {
    socket.join('')
  })

  // Welcome current user
  socket.emit('message', formatMessage(bot, 'Welcome Here'))

  // Broadcast when a new user connects
  socket.broadcast.emit('message', formatMessage(bot, 'A user has joined the chat'))

  // Runs when the client disconnects
  socket.on('disconnect', () => {
    io.emit('message', formatMessage(bot, 'A user has left the chat'))
  })

  // Listen for chat message
  socket.on('chat-message', message => {
    io.emit('message', formatMessage('USER', message))
  })
})

app.use(express.static(path.join(__dirname, 'public')))
