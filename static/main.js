document.addEventListener('DOMContentLoaded', (event) => {
    var socket = io();
    var usernamePage = document.querySelector('#username-page');
    var chatPage = document.querySelector('#chat-page');
    var usernameForm = document.querySelector('#usernameForm');
    var messageForm = document.querySelector('#messageForm');
    var messageInput = document.querySelector('#message');
    var messageArea = document.querySelector('#messageArea');
    var connectingElement = document.querySelector('.connecting');

    var username = null;

    function connect(event) {
        username = document.querySelector('#name').value.trim();

        if(username) {
            usernamePage.classList.add('hidden');
            chatPage.classList.remove('hidden');

            socket.emit('message', username + ' joined the chat');
        }
        event.preventDefault();
    }

    function sendMessage(event) {
        var messageContent = messageInput.value.trim();

        if(messageContent && username) {
            socket.emit('message', username + ': ' + messageContent);
            messageInput.value = '';
        }
        event.preventDefault();
    }

    socket.on('message', function(msg) {
        var messageElement = document.createElement('li');
        messageElement.textContent = msg;
        messageArea.appendChild(messageElement);
        messageArea.scrollTop = messageArea.scrollHeight;
    });

    usernameForm.addEventListener('submit', connect, true);
    messageForm.addEventListener('submit', sendMessage, true);

    socket.on('connect', () => {
        connectingElement.classList.add('hidden');
    });

    socket.on('disconnect', () => {
        connectingElement.classList.remove('hidden');
    });
});
