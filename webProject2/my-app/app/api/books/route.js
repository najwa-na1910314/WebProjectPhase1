import bookRepo from "@/app/repo/BooksRepo.js";

export async function GET(request){
    let {searchParams} = new URL(request.url)
    let filterType = [...searchParams.keys()][0];
    let value = searchParams.get(filterType);
    let response;
    if(filterType == "bookId"){
         response = await bookRepo.getBookById(parseInt(value)) // get selected book by id
    } else if(filterType == "title"){
        response = await bookRepo.getBooksByName(value) // get book by its name
    } else if(filterType == "authorName"){
        response = await bookRepo.getBooksByAuthor(value) // get author by its name
    } else if(filterType == "category"){ // name of the category
        response = await bookRepo.getBooksByCategory(value) // get category of a book
    }
    else {
        response = await bookRepo.getBooks() // get all books
    }
    return Response.json(response, { status: 200 })
}

export async function PUT(request){
    let {searchParams} = new URL(request.url)
    let bookId = searchParams.get("bookId")
    let newBookObject = await request.json()
    
    let response;
    let updatedBook = await bookRepo.updateBook(parseInt(bookId), newBookObject)
    
    response = {
        status: 200,
        body: JSON.stringify(updatedBook)
    };
    return new Response(JSON.stringify(response),{status:200})
}

export async function POST(request){
    let {searchParams} = new URL(request.url)
    let newBookObject = await request.json()
    let response

    const newBook = await bookRepo.addBook(newBookObject)
    response = {
        status: 200,
        body: JSON.stringify(newBook)
    };
    return new Response(JSON.stringify(response),{status:200})
}
