const path = require('path')
const express = require('express')
const formatMessage = require('./utils/messages')
const { userJoin, getCurrentUser, userLeave, roomUsers } = require('./utils/users')

const app = express()

const server = app.listen(3000, () => {
  console.log('Server is up and running`')
})

const io = require('./socket').init(server)
const bot = 'Chat App'

io.on('connection', socket => {
  // Joining the room
  socket.on('join-room', ({ username, room }) => {
    const user = userJoin(socket.id, username, room)
    socket.join(user.room)

    // Welcome current user
    socket.emit('message', formatMessage(bot, 'Welcome Here'))

    // Broadcast when a new user connects
    socket.to(user.room).emit('message', formatMessage(bot, `${username} has joined the chat`))

    // Send users and rooms info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: roomUsers(user.room)
    })
  })

  // Listen for chat message
  socket.on('chat-message', message => {
    const user = getCurrentUser(socket.id)
    io.to(user.room).emit('message', formatMessage(user.username, message))
  })

  // Runs when the client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id)
    if (user) {
      socket.to(user.room).emit('message', formatMessage(bot, `${user.username} has left the chat`))
    }

    // Send users and rooms info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: roomUsers(user.room)
    })
  })
})

app.use(express.static(path.join(__dirname, 'public')))
