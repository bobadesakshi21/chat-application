const path = require('path')
const http = require('http')
const express = require('express')

const app = express()
const server = http.createServer(app)

const io = require('./socket').init(server)

app.use(express.static(path.join(__dirname, 'public')))

// Run when the client connects
io.on('connection', socket => {
  console.log('New web socket connection')
})

app.listen(3000, () => {
  console.log('Server is up and running`')
})
