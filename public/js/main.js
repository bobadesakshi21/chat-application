const socket = io('/')

socket.on('message', message => {
  console.log('Message Here: ', message)
})
