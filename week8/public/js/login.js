const socket = io();
function getRadioValue() {
  const selectedValue = document.querySelector(
    'input[name="userType"]:checked'
  ).id;
  console.log("Selected user type: " + selectedValue);
}

$(document).ready(function () {
  $("#loginForm").submit(function (event) {
    event.preventDefault();

    const username = $("#username").val();
    const password = $("#password").val();
    const selectedType = $('input[name="userType"]:checked').val();

    if (!selectedType) {
      displayError("Please select whether you are a Dog Walker or Dog Owner.");
      return;
    }

    $.ajax({
      url: "/login",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        email: username,
        password: password,
        type: selectedType,
      }),
      success: function (response) {
        if (response.message === "successful") {
          sessionStorage.setItem("user", JSON.stringify(response.result));
          socket.emit("register", response.result._id);
          window.location.href = "/dashboard";
          alert("Login Successful");
        } else {
          displayError(response.message);
        }
      },
      error: function (error) {
        console.log("Error:", error);
        displayError("An error occurred while logging in.");
      },
    });
  });

  function displayError(message) {
    $("#error-message").text(message).css("color", "red");
  }
});
