$(document).ready(function () {
  const reviewButton = document.getElementById("review");
  const contactButton = document.getElementById("contact");

  const profileData = JSON.parse(sessionStorage.getItem("user"));
  const sitterData = JSON.parse(localStorage.getItem("selectedSitter"));

  const location = JSON.parse(localStorage.getItem("location"));

  $("#firstName").text(sitterData.firstName);
  $("#lastName").text(sitterData.lastName);
  $("#phone").text(sitterData.phone);
  $("#email").text(sitterData.email);
  $("#address").text(sitterData.address);
  $("#suburb").text(sitterData.suburb);
  $("#postalCode").text(sitterData.postalCode);

  // Click event for Leave a Review button
  $("#review").click(function () {
    window.location.href = "review.html"; // Redirect to review.html
  });

  // Click event for Contact button
  // $("#contact").click(function () {
  //   const ownerData = profileData;

  //   const booking = {
  //     ownerId: ownerData._id,
  //     sitterId: sitterData._id,
  //     ownerName: ownerData.firstName + " " + ownerData.lastName,
  //     sitterName: sitterData.firstName + " " + sitterData.lastName,
  //     date: new Date(),
  //     address: location,
  //     services:
  //       sitterData.services && sitterData.services.length > 0
  //         ? sitterData.services[0]
  //         : "Dog Walking",
  //   };
  //   saveBooking(booking);
  // });
});

// const saveBooking = (obj) => {
//   const profileData = JSON.parse(sessionStorage.getItem("user"));
//   $.ajax({
//     type: "POST",
//     url: "/user/bookings/save",
//     data: JSON.stringify(obj),
//     contentType: "application/json",
//     success: function (response) {
//       window.location.href = `http://localhost:3040/user?userid=${profileData._id}`;
//     },
//     error: function (error) {
//       console.error("Error:", error);
//     },
//   });
// };

document
  .getElementById("viewBookingsLink")
  .addEventListener("click", function (event) {
    const profileData = JSON.parse(sessionStorage.getItem("user"));
    event.preventDefault();
    window.location.href = `http://localhost:3041/user?userid=${profileData._id}`;
  });
