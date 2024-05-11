/*
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
    bookIndex = booklist.findIndex((book) => book["book_id"] == bookId);
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
*/
/*
async function storeOrder() {
  let file = await fetch("orderHistory.json");
  console.log(file);
}
*/

import prisma from './prisma'; // Import Prisma client instance

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get("bookId");

  if (bookId) {
    try {
      const book = await fetchBookDetails(bookId);
      fillData(book);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  }

  const buybtn = document.getElementById("buybtn");
  buybtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const quantity = parseInt(document.getElementById("book_quantity").value);
    const bookPrice = parseFloat(document.getElementById("book_price").value);

    const totalCost = quantity * bookPrice;

    try {
      const user_data = await fetchUserData(); // Fetch user data from Prisma
      if (parseInt(user_data.bankAccount.balance) >= totalCost) {
        const orderData = {
          book_quantity: quantity,
          book_id_fk: parseInt(bookId),
          user_id_fk: parseInt(user_data.user_id),
        };
        const newOrders = await prisma.order.create({ data: orderData });
        updateBalanceAndUI(newOrders, quantity, totalCost, user_data);
      } else {
        const balanceError = document.getElementById("balance_error");
        balanceError.innerHTML = `Insufficient Balance, ${user_data.first_name} has only ${user_data.bankAccount.balance}`;
      }
    } catch (error) {
      console.error("Error processing order:", error);
    }
  });
});

async function fetchBookDetails(bookId) {
  return prisma.book.findUnique({
    where: { book_id: parseInt(bookId) }
  });
}

async function fetchUserData() {
  return prisma.userAccount.findFirst({
    where: { user_id: 1 }, // You need to replace this with the actual user ID
    include: { bankAccount: true } // Include related bank account data
  });
}

async function updateBalanceAndUI(newOrders, quantity, totalCost, userData) {
  // Update user's balance
  await prisma.bankAccount.update({
    where: { bank_account_id: userData.bankAccount.bank_account_id },
    data: { balance: userData.bankAccount.balance - totalCost }
  });

  // Update UI here if needed
}

function fillData(book) {
  document.getElementById("book_id").value = book.book_id;
  document.getElementById("book_title").value = book.book_title;
  document.getElementById("book_quantity").value = 1;
  document.getElementById("book_price").value = book.unit_price;
  const totalCost = parseFloat(book.unit_price);
  document.getElementById("total-price").value = totalCost.toFixed(2);

  // Populate other fields if needed, such as shipping address
}
