//(display model + make drop downs)
//const modelDD = document.querySelector("#models")

import { Book } from "../classes/Book.js";

const addButton = document.querySelector("#add");
console.log(addButton);

//---------------------------------------------------------------------------

let seller_sales = []; //global list

const history_view = document.querySelector(".sale_item_container");
console.log(history_view);

addButton.addEventListener("click", addBook);

async function addBook(event) {
  event.preventDefault();

  let user_response = localStorage.getItem("user_data");
  let user_data = JSON.parse(user_response);
  let user_id = user_data[0]["userid"];

  console.log(user_id); // id showing

  const booklist = await getBooksFromLocalStorage();

  let id = booklist[booklist.length - 1]["id"] + 1;
  let title = document.getElementById("title").value;
  let isbn = document.getElementById("isbn").value;

  let status = document.getElementById("status").value;
  let categories = document.getElementById("categories").value;
  let thumbnailUrl = document.getElementById("image").value;
  let price = document.getElementById("price").value;
  let quantity = document.getElementById("quantity").value;
  console.log(id); //works

  const newBook = new Book(
    id,
    title,
    isbn,

    status,
    categories,
    thumbnailUrl,
    quantity,
    price
  );

  //add to list
  seller_sales.push(newBook);
  booklist.push(newBook);

  console.log("this is seller list");
  seller_sales.forEach((element) => {
    console.log(element);
  });

  booklist.forEach((element) => {
    console.log(element);
  });

  localStorage.setItem("cars_store", JSON.stringify(booklist));
  localStorage.setItem(`${user_id}`, JSON.stringify(seller_sales));

  //add new obj to html
  loadSellerSales();
}
async function getBooksFromLocalStorage() {
  console.log("get function");
  const booklist = JSON.parse(localStorage.getItem("books"));

  return booklist;
}
let saleCounter;
let soldItemCounter;
let onSaleItemCounter;

async function loadSellerSales() {
  saleCounter = 0;
  soldItemCounter = 0;
  onSaleItemCounter = 0;
  //get user id -> the one who's logged in
  let user_response = localStorage.getItem("user_data");
  let user_data = JSON.parse(user_response);
  let user_id = user_data[0]["userid"];

  console.log("in seller sales " + user_id); // ok id showing

  //search for a list in local storage named by (his id)
  if (localStorage.getItem(`${user_id}`) != null) {
    console.log("there are items in seller salses");
    const seller_sale_localStorage = JSON.parse(
      localStorage.getItem(`${user_id}`)
    );
    history_view.innerHTML = "";
    seller_sales = []; //clear list

    seller_sale_localStorage.forEach((sale) => {
      saleCounter++;
      if (sale["quantity"] == 0) {
        soldItemCounter++;
        console.log("quantity is zero");
        history_view.innerHTML += ``;
      } else {
        onSaleItemCounter++;
        console.log("quantity is not zero");
        history_view.innerHTML += ``;
      }
      seller_sales.push(sale);
    });
    const counterPlace = document.querySelector("#item_counter");
    counterPlace.innerHTML =
      `Total Sales: ` +
      saleCounter +
      ` | Sold Items: ` +
      soldItemCounter +
      ` | On Sale Items: ` +
      onSaleItemCounter;
  }
}
window.addEventListener("DOMContentLoaded", function (event) {
  loadSellerSales();
});
