// ========================================
// 1. EVENT CATEGORY FILTERING
// ========================================

function filterEvents(category) {

    let events = document.querySelectorAll(".event-card");

    events.forEach(function(event) {

        if (category === "all") {

            event.style.display = "flex";

        }

        else if (event.classList.contains(category)) {

            event.style.display = "flex";

        }

        else {

            event.style.display = "none";

        }

    });

}


// ========================================
// 2. JOIN EVENT FUNCTIONALITY
// ========================================

function joinEvent(button) {

    if (button.innerText === "Join Event") {

        alert("Congratulations! You have successfully joined the event.");

        button.innerText = "Joined";

        button.style.backgroundColor = "green";

    }

}


// ========================================
// 3. LOGIN AND SIGN UP FUNCTIONALITY
// ========================================

let isSignUp = false;


function switchForm() {

    isSignUp = !isSignUp;

    const nameField = document.getElementById("name-field");

    const confirmField = document.getElementById("confirm-field");

    const title = document.getElementById("form-title");

    const subtitle = document.getElementById("form-subtitle");

    const button = document.getElementById("submit-btn");

    const switchText = document.getElementById("switch-text");

    const nameInput = document.getElementById("fullname");

    const confirmInput = document.getElementById("confirm-password");

    const message = document.getElementById("form-message");


    // Clear previous messages

    message.innerText = "";

    message.style.backgroundColor = "transparent";


    if (isSignUp) {

        // Show registration fields

        nameField.style.display = "block";

        confirmField.style.display = "block";

        nameInput.required = true;

        confirmInput.required = true;


        title.innerText = "Create Account";

        subtitle.innerText = "Join our Green Community today.";

        button.innerText = "Sign Up";


        switchText.innerHTML =
            'Already have an account? <a href="#" onclick="switchForm(); return false;">Login</a>';

    }

    else {

        // Hide registration fields

        nameField.style.display = "none";

        confirmField.style.display = "none";

        nameInput.required = false;

        confirmInput.required = false;


        title.innerText = "Welcome Back!";

        subtitle.innerText = "Login to become a part of our community.";

        button.innerText = "Login";


        switchText.innerHTML =
            'Don\'t have an account? <a href="#" onclick="switchForm(); return false;">Sign Up</a>';

    }

}



// ========================================
// 4. FORM SUBMISSION
// ========================================

const userForm = document.getElementById("userForm");


if (userForm) {

    userForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const password = document.getElementById("password").value;

        const email = document.getElementById("email").value;

        const message = document.getElementById("form-message");



        // ========================================
        // SIGN UP PROCESS
        // ========================================

        if (isSignUp) {


            // Check password confirmation

            if (password !== document.getElementById("confirm-password").value) {

                alert("Passwords do not match!");

                return;

            }


            const name = document.getElementById("fullname").value;


            // Get existing registered users

            let users = JSON.parse(localStorage.getItem("greenUsers")) || [];


            // Check duplicate email

            const existingUser = users.find(function(user) {

                return user.email === email;

            });


            if (existingUser) {

                alert("This email is already registered!");

                return;

            }


            // Create new user

            const newUser = {

                name: name,

                email: email,

                password: password

            };


            // Save user details

            users.push(newUser);

            localStorage.setItem("greenUsers", JSON.stringify(users));


            // Display success message

            message.innerText =
                "Registration successful! Welcome to Green Community.";

            message.style.color = "#2d6a4f";

            message.style.backgroundColor = "#d8f3dc";

            message.style.padding = "12px";


            userForm.reset();

        }



        // ========================================
        // LOGIN PROCESS
        // ========================================

        else {


            // Get registered users

            let users = JSON.parse(localStorage.getItem("greenUsers")) || [];


            // Verify login credentials

            const loggedInUser = users.find(function(user) {

                return user.email === email && user.password === password;

            });



            if (loggedInUser) {


                // Display personalized welcome message

                message.innerText =
                    "Welcome back, " + loggedInUser.name +
                    "! You are successfully logged in.";

                message.style.color = "#2d6a4f";

                message.style.backgroundColor = "#d8f3dc";

                message.style.padding = "12px";


                userForm.reset();

            }

            else {

                alert("Invalid email or password. Please try again.");

            }

        }

    });

}



// ========================================
// 5. DIRECT SIGN UP PAGE NAVIGATION
// ========================================

const urlParams = new URLSearchParams(window.location.search);


if (userForm && urlParams.get("mode") === "signup") {

    switchForm();

}