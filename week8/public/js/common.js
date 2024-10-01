document.getElementById("logoutLink").addEventListener("click", function () {
  sessionStorage.clear();

  window.location.href = "index.html";
});

document
  .getElementById("viewBookingsLink")
  .addEventListener("click", function (event) {
    const profileData = JSON.parse(sessionStorage.getItem("user"));
    event.preventDefault();
    window.location.href = `http://localhost:3041/user?userid=${profileData._id}`;
  });
