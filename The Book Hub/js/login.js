function validateForm() {
  var username = document.querySelector("#username").value;
  var password = document.querySelector("#password").value;

  // Fetch the users.json file
  user_login(username, password);

  // Prevent the form from submitting
  return false;
}
async function user_login(username, password) {
  let file = await fetch("json/users.json");
  let data = await file.json();
  let user = data.find(
    (user) => user.username === username && user.password === password
  );
  if (user == undefined) {
    console.log("Unregistered user!");
    alert("Unregistered user!")
  } else {
    localStorage.setItem("user_data", JSON.stringify(user));
    if (user["type"] == "customer") {
      window.location.href = "index.html";
    }
    if (user["type"] == "seller") {
      window.location.href = "seller/index.html";
    }
    if (user["type"] == "admin") {
      window.location.href = "admin/index.html";
    }
    //return data
  }
}
