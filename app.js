const path = require('path')
const express = require('express')

const app = express()

const server = app.listen(3000, () => {
  console.log('Server is up and running`')
})

const io = require('./socket').init(server)

const chatRoute = require('./routes/chat')

app.use(express.static(path.join(__dirname, 'public')))

app.use('/chat', chatRoute)
