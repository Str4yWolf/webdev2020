//const socket = io('http://localhost:3000')
let messageContainer;
let messageBtn;
let messageInput;


const myName = prompt("What's your name?")

// socket.emit('new-user', name)

// socket.on('welcome-message', data => {
//     appendMessage(data)
// })

// socket.on('user-connected', name => {
//     appendMessage(`${name} joined`)
// })

// socket.on('user-disconnected', name => {
//     appendMessage(`${name} has left the chat`)
// })


// socket.on('chat-message', data => {
//     appendMessage(data)
// })



const appendMessage = ({name="System", message}) => {
    const messageElement = document.createElement('div');
    const h6Element = document.createElement('h6');
    const pElement = document.createElement('p');

    h6Element.innerText = name ? name : myName;

    if (!name) messageElement.classList.add('own');

    pElement.innerText = message;
    messageElement.append(h6Element);
    messageElement.append(pElement);
    
    messageContainer.append(messageElement);
}

const sendMessage = () => {
    if (messageInput.value === '') return;
    const message = messageInput.value;
    appendMessage({name: '', message: `${message}`});
    //socket.emit('send-chat-message', message)
    messageInput.value = '';
    
    messageInput.focus();
}

window.addEventListener('DOMContentLoaded', () => {
    messageContainer = document.getElementById('chat-container');
    messageBtn = document.getElementById('input-submit-btn');
    messageInput = document.getElementById('input-submit-text');

    appendMessage({message: `You joined`});

    messageBtn.addEventListener("click", sendMessage);

    messageInput.addEventListener("keydown", e => {
        if (e.code === 'Enter') sendMessage();
    })

    messageInput.focus();
})