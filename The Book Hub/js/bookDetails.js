document.addEventListener("DOMContentLoaded", async () => {
    //completed
    var bookId = window.location.href.split("=")[1]
    
    if (bookId != null || bookId != "") {
        let booklist = localStorage.getItem("books")
        let bookIndex = booklist.findIndex((book)=>book["_id"]==bookId)
        if(bookIndex != -1){
            booklist[bookIndex]
        }
        else {
            console.log("No book data");
        }
    } else {
      showBooks();
    }
  });

  function fillData(book){
     document.getElementById("book_id").value=book["_id"]
    document.getElementById("book_title").value=book["title"]
     document.getElementById("book_quantity").value=book["quantity"]
     document.getElementById("book_price")
  }