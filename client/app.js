const socket = io(); // correct connection

const myId = Date.now(); // unique id

function sendMessage() {
  const input = document.getElementById("msg");
  const message = input.value;

  if (message.trim() === "") return;

  const data = {
    text: message,
    time: new Date().toLocaleTimeString(),
    sender: myId
  };

  // show your message
  addMessage(data, "green");

  // send to server
  socket.emit("message", data);

  input.value = "";
}

// receive messages
socket.on("message", (data) => {
  if (data.sender === myId) return; // avoid duplicate

  addMessage(data, "blue");
});

function addMessage(data, color) {
  const messages = document.getElementById("messages");

  const div = document.createElement("div");
  div.className = "message " + color;

  div.innerHTML = `
    <div>${data.text}</div>
    <div class="time">${data.time}</div>
  `;

  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}