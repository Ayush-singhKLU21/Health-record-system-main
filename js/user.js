// Get logged-in user

let currentUser =
    JSON.parse(localStorage.getItem("currentUser"));


// Check login

if (!currentUser) {

    alert("Please login first!");

    window.location.href = "login.html";

}


// Display user name

if (currentUser) {

    document.getElementById("userName").textContent =
        currentUser.name;

}


// Logout function

function logout() {

    localStorage.removeItem("currentUser");

    alert("Logged out successfully!");

    window.location.href = "login.html";

}