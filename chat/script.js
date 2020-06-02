const socket = io('http://localhost:3000k')
const messageContainer = document.getElementById("");
const messageForm = document.getElementById("");
const messageInput = document.getElementById("")


const name = promt("What's your name?")
appendMessage(`You joined`)
socket.emit('new-user', name)

socket.on('welcome-message', data => {
    appendMessage(data)
})

socket.on('user-connected', name => {
    appendMessage(`${name} joined`)
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} has left the chat`)
})


socket.on('chat-message', data => {
    appendMessage(data)
})

messageForm.addEventListener("submit", e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

const appentMessage = ({name, message}) => {
    const messageElement = docmument.createElement('div');
    messageElement.innerText = `${name}: ${message}`;
    messageContainer.append(messageElement)
}