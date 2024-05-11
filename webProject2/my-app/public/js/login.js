function validateForm() {
  var username = document.querySelector("#username").value;
  var password = document.querySelector("#password").value;

  // Fetch the users.json file
  user_login(username, password);

  // Prevent the form from submitting
  return false;
}
async function user_login(username, password) {
  let request = await fetch("../api/users");
  let data = await request.json();
  console.log(data)
  let user = data.find(
    (user) => user.user_name === username && user.password === password
  );
  if (user == undefined) {
    console.log("Unregistered user!");
    alert("Unregistered user!")
  } else {
    localStorage.setItem("user_data", JSON.stringify(user));
    if (user["account_type"] == "Customer") {
      window.location.href = "main.html";
    }
    if (user["account_type"] == "Seller") {
      window.location.href = "seller/uploadBook.html";
    }
    if (user["account_type"] == "Admin") {
      window.location.href = "admin/main.html";
    }
    //return data
  }
}
