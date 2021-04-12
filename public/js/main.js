const socket = io('/')

const chatForm = document.getElementById('chat-form')

// Message from server
socket.on('message', message => {
  console.log('Message Here: ', message)
})

chatForm.addEventListener('submit', (e) => {
  e.preventDefault()

  // Get Message Text
  const msg = e.target.elements.msg.value

  // Emit message to the server
  socket.emit('chat-message', msg)
})
