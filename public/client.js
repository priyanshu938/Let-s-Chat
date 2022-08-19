const socket = io();
let userName = "";
let textarea = document.getElementById("textarea");
let messageArea = document.querySelector(".message__area");
do {
  userName = prompt("Enter your name: ");
} while (!userName);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: userName,
    message: message.trim(),
  };

  //Append message
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom()

  //Send to server

  socket.emit("message", {
    msg,
  });
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>    
    `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

//Receive messages

socket.on("message", (msg) => {
  appendMessage(msg.msg, "incoming");
  scrollToBottom()
});

function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}