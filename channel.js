var socket = io();
const channelId = window.location.pathname.split('/').pop();

socket.on('connect', () => {
    socket.emit('join channel', channelId);
    console.log('Connected to channel:', channelId);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('chat message', (data) => {
    var item = document.createElement('li');
    item.textContent = `${data.name}: ${data.message}`;
    document.getElementById('messages').appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
    showPopupNotification();
});

socket.on('notification', (msg) => {
    var item = document.createElement('div');
    item.textContent = msg;
    item.classList.add('alert', 'alert-info');
    document.getElementById('notifications').appendChild(item);
    setTimeout(() => {
        item.remove();
    }, 5000);
});

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    var name = document.getElementById('your-name').value;
    var message = document.getElementById('your-message').value;
    if (name && message) {
        socket.emit('chat message', { channelId: channelId, name: name, message: message });
        document.getElementById('your-message').value = '';
    }
});

function showPopupNotification() {
    var popup = document.getElementById('popup-notification');
    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}
