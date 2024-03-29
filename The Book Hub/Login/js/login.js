function validateForm() {
    var username = document.querySelector("#username").value;
    var password = document.querySelector("#password").value;

    // Fetch the users.json file
    fetch('users.json')
        .then(response => response.json()) // Parse the JSON data from the file
        .then(users => {
            // Find the user with the matching username and password
            var user = users.find(user => user.username === username && user.password === password);
            if (user) {
                // User is valid, redirect them to the main page
                console.log("Login successful for user:", user.username);
                window.location.href = '../../Main Page/index.html'; // Replace 'main.html' with the URL of your main page
            } else {
                // User is invalid, show an error message
                alert("Invalid username or password");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred while processing the login");
        });

    // Prevent the form from submitting
    return false;
}
