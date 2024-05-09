import bookRepo from "@/app/repo/BooksRepo.js";

export async function GET(request){
    let response = await bookRepo.getBooks() // get all books
    return Response.json(response, { status: 200 })
}