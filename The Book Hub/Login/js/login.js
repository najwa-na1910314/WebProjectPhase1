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
                // User is valid, you can redirect them to the main page or perform other actions
                console.log("Login successful for user:", user.username);
                // Redirect to the main page or another page based on the user type
                // For example: window.location.href = 'main.html';
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