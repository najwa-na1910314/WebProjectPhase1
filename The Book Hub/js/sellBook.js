//(display model + make drop downs)
//const modelDD = document.querySelector("#models")
/*
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
}*/
window.addEventListener("DOMContentLoaded", async function (event) {
  let booklist = JSON.parse(localStorage.getItem("books"))
  let ele1 = document.getElementById("book_drop_down")
  ele1.addEventListener("change", ()=>{
    let selectedBookId = ele1.value
    // show call book info
    if(ele1.value!=""){
      showBookInfo(selectedBookId)
    } else {
      document.getElementById("bid").value = ""
    document.getElementById("isbn").value = ""
    document.getElementById("title").value = ""
    document.getElementById("quantity").value = ""
    document.getElementById("price").value = ""
    document.getElementById("categories").value = ""
    document.getElementById("status").value = ""
    document.getElementById("image").value = ""
    }
    
  })

  let ele2 = document.getElementById("add")
  ele2.addEventListener("click", (event)=>{
    event.preventDefault()
    let ele3 = document.getElementById("bid")
    if(ele3.value==""){
      console.log("Add a new book");
      addBook()
    } else{
      console.log("Update book info");
      updateBook()
    }
  })

  

  function loadBookIds(){
    console.log("Hello");
    booklist.forEach(book => {
      ele1.innerHTML+=`
      <option value="${book["_id"]}">${book["title"]}</option>
      `
    });
  }

  function showBookInfo(selectedBookId){
    if(selectedBookId!=""){
      console.log("Update book");
      let selectedBookIndex = findBookById(selectedBookId)
      fillFields(selectedBookIndex)
    } else {
      console.log("Add a new book");
    }
  }

  function findBookById(selectedBookId){
    return booklist.findIndex((book)=> book["_id"]==selectedBookId)
  }

  function fillFields(bookIndex){
    document.getElementById("bid").value = booklist[bookIndex]["_id"]
    document.getElementById("isbn").value = booklist[bookIndex]["isbn"]
    document.getElementById("title").value = booklist[bookIndex]["title"]
    document.getElementById("quantity").value = booklist[bookIndex]["quantity"]
    document.getElementById("price").value = booklist[bookIndex]["price"]
    document.getElementById("categories").value = booklist[bookIndex]["categories"].toString()
    document.getElementById("status").value = booklist[bookIndex]["status"]
    document.getElementById("image").value = booklist[bookIndex]["thumbnailUrl"]

    document.getElementById("pageCount").value = booklist[bookIndex]["pageCount"]
    document.getElementById("authors").value = booklist[bookIndex]["authors"].toString()
    let unformatD = new Date(booklist[bookIndex]["publishedDate"]["$date"])
    let formattedD = unformatD.toISOString().slice(0,10)
    document.getElementById("date").value = formattedD
    document.getElementById("short_desc").value = booklist[bookIndex]["shortDescription"]
    document.getElementById("long_desc").value = booklist[bookIndex]["longDescription"]
    
  }

  function updateBook(){
    let bid = parseInt(document.getElementById("bid").value)
    let bookIndex = findBookById(bid)
     /*= booklist[bookIndex]["_id"]
     = booklist[bookIndex]["isbn"]
     = booklist[bookIndex]["title"]
     = booklist[bookIndex]["quantity"]
     = booklist[bookIndex]["price"]
     = booklist[bookIndex]["categories"].toString()
     = booklist[bookIndex]["status"]
     = booklist[bookIndex]["thumbnailUrl"]

     = booklist[bookIndex]["pageCount"]
     = booklist[bookIndex]["authors"].toString()
    let unformatD = new Date(booklist[bookIndex]["publishedDate"]["$date"])
    let formattedD = unformatD.toISOString().slice(0,10)
     = formattedD
     = booklist[bookIndex]["shortDescription"]
     = booklist[bookIndex]["longDescription"]*/
    let newBook = {
      _id: document.getElementById("bid").value,
    title: document.getElementById("title").value,
    isbn: document.getElementById("isbn").value,
    pageCount: document.getElementById("pageCount").value,
    publishedDate: {
      $date: document.getElementById("date").value
    },
    thumbnailUrl: document.getElementById("image").value,
    shortDescription: document.getElementById("short_desc").value,
    longDescription: document.getElementById("long_desc").value,
    status: document.getElementById("status").value,
    authors: document.getElementById("authors").value.split(","),
    categories: document.getElementById("categories").value.split(","),
    quantity: document.getElementById("quantity").value,
    price: document.getElementById("price").value
    }
    console.log(newBook);
    booklist[bookIndex] = newBook
    localStorage.setItem("books", JSON.stringify(booklist))
  }

  function generateBookId(){ // sorts the book from largest to the smallest based on the book id
    let sortedBooks = booklist.sort((fbook, sbook)=> sbook["_id"] - fbook["_id"])
    let maxId = parseInt(sortedBooks[0]["_id"])
    console.log(maxId);
    return maxId+1
  }

  function addBook(){
    let newBookId = generateBookId()
    let newBook = {
      _id: newBookId,
    title: document.getElementById("title").value,
    isbn: document.getElementById("isbn").value,
    pageCount: document.getElementById("pageCount").value,
    publishedDate: {
      $date: document.getElementById("date").value
    },
    thumbnailUrl: document.getElementById("image").value,
    shortDescription: document.getElementById("short_desc").value,
    longDescription: document.getElementById("long_desc").value,
    status: document.getElementById("status").value,
    authors: document.getElementById("authors").value.split(","),
    categories: document.getElementById("categories").value.split(","),
    quantity: document.getElementById("quantity").value,
    price: document.getElementById("price").value
    }
    console.log(newBook);
    booklist.unshift(newBook)
    localStorage.setItem("books", JSON.stringify(booklist))
  }

  loadBookIds()
  
});
