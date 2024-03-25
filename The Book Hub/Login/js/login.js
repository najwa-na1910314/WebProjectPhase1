function validateForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username === "" || password === "") {
        alert("Username and password cannot be empty");
        return false;
    }
    // Add more validation logic if needed
    return true;
}
