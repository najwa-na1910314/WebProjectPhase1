import authorRepo from "@/app/repo/AuthorsRepo.js";

export async function GET(request){
    let {searchParams} = new URL(request.url)
    let filterType = [...searchParams.keys()][0];
    let value = searchParams.get(filterType);
    let response;
    if(filterType == "authorId"){
         response = await authorRepo.getAuthorById(parseInt(value)) // get selected author by id
    } else {
        response = await authorRepo.getAuthors() // get all authors
    }
    return Response.json(response, { status: 200 })
}