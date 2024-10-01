
$(document).ready(function () {
    // Initialize Materialize modals
    M.Modal.init(document.querySelectorAll('.modal'));

    // Event listener for "Book Me" buttons
    $(".click-me-button").click(function () {
        const serviceName = $(this).attr("data-service"); // Get the selected service name
        $("#name").val(serviceName); // Populate the "Services" input with the selected service
        localStorage.setItem("selectedService", serviceName); // Store the selected service in localStorage
        M.updateTextFields(); // Update Materialize text fields
    });

    // Click event for Contact button (form submission)
    $("#formSubmit").click(function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        const profileData = JSON.parse(sessionStorage.getItem("user")); // Get user data
        const sitterData = JSON.parse(localStorage.getItem("selectedSitter")); // Get sitter data
        const location = JSON.parse(localStorage.getItem("location")); // Get location
        const selectedService = localStorage.getItem("selectedService"); // Get the selected service from localStorage

        const ownerData = profileData;

        // Prepare the booking object with service and form data
        const booking = {
            ownerId: ownerData._id,
            sitterId: sitterData ? sitterData._id : null, // In case sitter is stored separately
            ownerName: ownerData.firstName + " " + ownerData.lastName,
            sitterName: sitterData ? sitterData.firstName + " " + sitterData.lastName : "Not Assigned",
            date: $("#date").val(), // Date selected by user in the form
            time: $("#time").val(), // Time selected by user in the form
            address: location,
            services: selectedService || "Dog Walking", // Use the selected service or a default value
        };

        saveBooking(booking);
    });
});

// Save the booking data via an AJAX request
const saveBooking = (obj) => {
    const profileData = JSON.parse(sessionStorage.getItem("user"));
    $.ajax({
        type: "POST",
        url: "/user/bookings/save",
        data: JSON.stringify(obj),
        contentType: "application/json",
        success: function (response) {
            window.location.href = `http://localhost:3041/user?userid=${profileData._id}`; // Redirect after successful booking
        },
        error: function (error) {
            console.error("Error:", error);
        },
    });
};


$(document).ready(function () {
    // Initialize Materialize modals
    M.Modal.init(document.querySelectorAll('.modal'));

    // $('#formSubmit').click(function () {
    //     const name = $('#name').val();
    //     const phone = $('#phone').val();
    //     const date = $('#date').val();
    //     const time = $('#time').val();

    //     $.ajax({
    //         type: 'POST',
    //         url: '/api/bookings',
    //         data: JSON.stringify({
    //             name: $('#name').val(),
    //             phone: $('#phone').val(),
    //             date: $('#date').val(),
    //             time: $('#time').val()
    //         }),
    //         contentType: 'application/json',
    //         success: function (response) {
    //             alert('Booking successful!');
    //             M.Modal.getInstance(document.getElementById('modal1')).close(); // Close modal on success
    //             // Fetch and display the updated list of bookings
    //             fetchAndDisplayBookings();
    //         },
    //         error: function (error) {
    //             alert('Error saving booking');
    //             console.error('Error:', error);
    //         }
    //     });
    // });


    // Function to fetch and display booking details
    function fetchAndDisplayBookings() {
        $.ajax({
            url: '/api/bookings',
            method: 'GET',
            success: function (data) {
                console.log('Data received:', data); // Log the response to inspect its structure
                const tableBody = $('#bookingTableBody');
                tableBody.empty(); // Clear existing rows

                if (Array.isArray(data)) {
                    data.forEach(booking => {
                        const bookingDate = new Date(booking.date);
                        const bookingTime = new Date(`1970-01-01T${booking.time}Z`);

                        const formattedDate = bookingDate.toLocaleDateString();
                        const formattedTime = bookingTime.toLocaleTimeString();

                        const row = `<tr>
                                <td>${booking.name}</td>
                                <td>${booking.phone}</td>
                                <td>${formattedDate}</td>
                                <td>${formattedTime}</td>
                            </tr>`;
                        tableBody.append(row);
                    });
                } else {
                    console.error('Unexpected data format:', data);
                    console.log(data);
                }
            },
            error: function (error) {
                console.error('Error fetching bookings:', error);
            }
        });
    }

    // Function to fetch and display specific booking details
    function fetchSpecificBooking(name) {
        $.ajax({
            url: `/api/bookings/${name}`,
            method: 'GET',
            success: function (data) {
                console.log('Data received:', data); // Log the response to inspect its structure
                const tableBody = $('#bookingTableBody');
                tableBody.empty(); // Clear existing rows

                if (data) {
                    // Proper date-time parsing
                    const bookingDate = new Date(data.date);
                    const bookingTime = new Date(`1970-01-01T${data.time}`);

                    const row = `<tr>
                        <td>${data.name}</td>
                        <td>${data.phone}</td>
                        <td>${bookingDate.toLocaleDateString()}</td>
                        <td>${bookingTime.toLocaleTimeString()}</td>
                    </tr>`;
                    tableBody.append(row);
                } else {
                    console.error('Unexpected data format:', data);
                }
                $('#specificBookingName').val(''); // Clear the input field
            },
            error: function (error) {
                console.error('Error fetching specific booking:', error);
            }
        });
    }

    // Bind the click event to the "View All Bookings" button
    $('#viewAllBookings').click(function () {
        fetchAndDisplayBookings(); // Fetch and display all bookings on button click
    });

    // Bind the click event to the "View Specific Booking" button
    $('#viewSpecificBooking').click(function () {
        const specificBookingName = $('#specificBookingName').val();
        if (specificBookingName) {
            fetchSpecificBooking(specificBookingName); // Fetch and display specific booking on button click
        } else {
            alert('Please enter a name.');
        }
    });
});