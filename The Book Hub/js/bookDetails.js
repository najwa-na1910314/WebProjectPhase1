document.addEventListener("DOMContentLoaded", async () => {
    //completed
    var bookId = window.location.href.split("=")[1]
    
    if (bookId != null || bookId != "") {
        
        //let bookIndex = findBookIndex(bookId)
        //let bookIndex = booklist.findIndex((book)=>book["_id"]==bookId)
        //console.log(bookIndex)
        let booklist = JSON.parse( localStorage.getItem("books"))
        let bookIndex = booklist.findIndex((book)=>book["_id"]==bookId)
        if(bookIndex != -1){
            fillData(booklist[bookIndex])
        }
        else {
            console.log("No book data");
        }
    } else {
      showBooks();
    }
    let buyButton = document.getElementById("buy-button")
    buyButton.addEventListener("click", (event) =>{
        event.preventDefault()

        let orderHistory = localStorage.getItem("orderHistory")
        let userData = JSON.parse(localStorage.getItem("user_data"))

        let quantity =  document.getElementById("book_quantity").value
        let price = document.getElementById("book_price").value
        let totalCost = parseFloat(price)*parseInt(quantity)

        let orderData = {
            book_id: bookId,
            user_id: parseInt(userData["userid"]),
            quantity: document.getElementById("book_quantity").value,
            total_cost: totalCost,
          };
          if(orderHistory == null){
            orderHistory = []
            orderHistory.push(orderData)
          }else{
            orderHistory = JSON.parse(localStorage.getItem("orderHistory"))
            orderHistory.push(orderData)
          }
          localStorage.setItem("orderHistory", JSON.stringify(orderHistory))
    })
  });


  function findBookIndex(bookId){
    let booklist = JSON.parse( localStorage.getItem("books"))
    let bookIndex = booklist.findIndex((book)=>book["_id"]==bookId)
    console.log(bookIndex)
    return bookIndex
  }
  
  function fillData(book){
    let user_data = JSON.parse(localStorage.getItem("user_data"))
     document.getElementById("book_id").value=book["_id"]
    document.getElementById("book_title").value=book["title"]
     document.getElementById("book_quantity").value= 1
     document.getElementById("book_price").value=book["price"]

    document.getElementById("total-price").value= book["price"]
     document.getElementById("city").value=user_data["shippingAddress"]["city"]
    document.getElementById("zone").value=user_data["shippingAddress"]["zone"]
     document.getElementById("shipping-address").value=user_data["shippingAddress"]["streetNo"]
     document.getElementById("buildingNO").value=user_data["shippingAddress"]["buildingNo"]
  }