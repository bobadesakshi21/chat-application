const socket = io('/')

const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')

const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})

// Join the chat room
socket.emit('join-room', { username, room })

// Get Rooms and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room)
  outputUser(users)
})

// Message from server
socket.on('message', message => {
  console.log('Message Here: ', message)
  outputMessage(message)

  // Scroll Down
  chatMessages.scrollTop = chatMessages.scrollHeight
})

chatForm.addEventListener('submit', (e) => {
  e.preventDefault()

  // Get Message Text
  const msg = e.target.elements.msg.value

  // Emit message to the server
  socket.emit('chat-message', msg)

  // Clear input box
  e.target.elements.msg.value = ''
  e.target.elements.msg.focus()
})

// Output message to DOM
const outputMessage = msg => {
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = `<p class="meta">${msg.username} <span>${msg.time}</span></p>
  <p class="text">
    ${msg.text}
  </p>`
  document.querySelector('.chat-messages').appendChild(div)
}

// Add room name to DOM
const outputRoomName = (room) => {
  roomName.innerText = room
}

// Add users to DOM
const outputUser = (users) => {
  userList.innerText = `
  ${users.map(user => `<li>${user.username}</li>`).join('')}
  `
}
