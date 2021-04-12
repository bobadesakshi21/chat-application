const path = require('path')
const express = require('express')

const app = express()

const server = app.listen(3000, () => {
  console.log('Server is up and running`')
})

const io = require('./socket').init(server)

io.on('connection', socket => {
  console.log('New web socket connection')
  socket.emit('message', 'Welcome Here')
})

const chatRoute = require('./routes/chat')

app.use(express.static(path.join(__dirname, 'public')))
