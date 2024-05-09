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
    }
    else {
        response = await bookRepo.getBooks() // get all books
    }
    return Response.json(response, { status: 200 })
}