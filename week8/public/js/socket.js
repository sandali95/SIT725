// socket.js
const initializeSocket = (profileData) => {
  const socket = io(); // Initialize socket connection

  socket.emit("user_connected", {
    username: profileData ? profileData.firstName : "Guest",
  });

  socket.on("welcome_message", (data) => {
    document.getElementById("welcomeMessage").innerText = data.message;
  });

  socket.on("Transaction", (data) => {
    showNotification();
  });
};

const showNotification = () => {
  var notification = document.getElementById("notification");
  notification.classList.add("show");

  // Hide the notification after 50 seconds
  setTimeout(function () {
    notification.classList.remove("show");
  }, 500000);
};

const closeNotification = () => {
  var notification = document.getElementById("notification");
  notification.classList.remove("show");
};
