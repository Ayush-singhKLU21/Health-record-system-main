// ================= SIGNUP =================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (e) {

        e.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim().toLowerCase();
        let mobile = document.getElementById("mobile").value.trim();
        let password = document.getElementById("password").value;
        let role = document.getElementById("role").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check duplicate email
        let existingUser = users.find(function (user) {
            return user.email === email;
        });

        if (existingUser) {
            alert("Email already registered!");
            return;
        }

        // New user
        let newUser = {
            id: Date.now(),
            name: name,
            email: email,
            mobile: mobile,
            password: password,
            role: role
        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful!");

        window.location.href = "login.html";
    });
}


// ================= LOGIN =================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        let email = document
            .getElementById("loginEmail")
            .value
            .trim()
            .toLowerCase();

        let password = document
            .getElementById("loginPassword")
            .value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        console.log("Registered Users:", users);

        let user = users.find(function (u) {
            return u.email === email &&
                   u.password === password;
        });

        if (!user) {
            alert("Invalid email or password!");
            return;
        }

        // Save current user
        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        alert("Login successful!");

        if (user.role === "admin") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "user.html";
        }

    });
}