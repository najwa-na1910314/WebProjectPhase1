document.addEventListener("DOMContentLoaded", async () => {
  //completed
  var bookId = window.location.href.split("=")[1];
  let booklist
  let bookIndex
  let user_data

  if (bookId != null || bookId != "") {
    //let bookIndex = findBookIndex(bookId)
    //let bookIndex = booklist.findIndex((book)=>book["_id"]==bookId)
    //console.log(bookIndex)
    booklist = JSON.parse(localStorage.getItem("books"));
    bookIndex = booklist.findIndex((book) => book["_id"] == bookId);
    if (bookIndex != -1) {
      fillData(booklist[bookIndex]);
    } else {
      console.log("No book data");
    }
  }

  let buybtn = document.getElementById("buybtn");
  buybtn.addEventListener("click", (event) => {
    event.preventDefault();
    let orderHistory = localStorage.getItem("orderHistory");
    user_data = JSON.parse(localStorage.getItem("user_data"));

    let quantity = parseInt(document.getElementById("book_quantity").value);
    let book_price = parseFloat(document.getElementById("book_price").value);

    let total_cost = quantity * book_price;
    if(parseInt(user_data["moneyBalance"])>=total_cost){
      let orderData = {
        book_id: bookId,
        user_id: parseInt(user_data["userid"]),
        quantity: document.getElementById("book_quantity").value,
        total_cost: total_cost,
      };
      if (orderHistory == null) {
        orderHistory = [];
      } else {
        orderHistory = JSON.parse(localStorage.getItem("orderHistory"));
      }
      orderData["order_id"] = orderHistory.length + 1;
  
      orderHistory.push(orderData);
  
      localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
      booklist[bookIndex]["quantity"] = parseInt(booklist[bookIndex]["quantity"])-quantity
      localStorage.setItem("books", JSON.stringify(booklist));
      user_data["moneyBalance"] = parseInt(user_data["moneyBalance"]) - total_cost
      localStorage.setItem("user_data",JSON.stringify(user_data))
    }
    else{
      let balanceError = document.getElementById("balance_error")
      balanceError.innerHTML = ""
      balanceError.innerHTML += `
        Insufficient Balance, ${user_data["name"]}
        Has only ${user_data["moneyBalance"]}
      `
    }
  });
});

function findBookIndex(bookId) {
  let booklist = JSON.parse(localStorage.getItem("books"));
  let bookIndex = booklist.findIndex((book) => book["_id"] == bookId);
  console.log(bookIndex);
  return bookIndex;
}
function fillData(book) {
  let user_data = JSON.parse(localStorage.getItem("user_data"));
  document.getElementById("book_id").value = book["_id"];
  document.getElementById("book_title").value = book["title"];
  document.getElementById("book_quantity").value = 1;
  document.getElementById("book_price").value = book["price"];
  let total_cost = parseInt(1) * parseFloat(book["price"]);
  document.getElementById("total-price").value = total_cost;

  document.getElementById("city").value = user_data["shippingAddress"]["city"];
  document.getElementById("zone").value = user_data["shippingAddress"]["zone"];
  document.getElementById("shipping-address").value =
    user_data["shippingAddress"]["streetNo"];
  document.getElementById("buildingNO").value =
    user_data["shippingAddress"]["buildingNo"];
}
/*
async function storeOrder() {
  let file = await fetch("orderHistory.json");
  console.log(file);
}
*/
