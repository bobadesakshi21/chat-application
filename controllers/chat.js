const io = require('../socket').getIO()

// Run when the client connects
io.on('connection', socket => {
  console.log('New web socket connection')
})

exports.chat = (req, res, next) => {

}
