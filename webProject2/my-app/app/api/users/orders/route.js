import usersRepo from "@/app/repo/UsersRepo.js";

export async function GET(request){
    let {searchParams} = new URL(request.url)
    let filterType = [...searchParams.keys()][0];
    let value = searchParams.get(filterType);
    let response;

    if(filterType == "uorder"){ // id for the user
        response = await usersRepo.getOrderByUserId(parseInt(value))
    } else if(filterType == "border"){ // id for the book
        response = await usersRepo.getOrderByBookId(parseInt(value))
    } 
    else {
        response = await usersRepo.getOrders() // get all orders
    }  
    return Response.json(response, { status: 200 })
    
    
}

export async function POST(request){
    let {searchParams} = new URL(request.url)
    let bookId = searchParams.get("bookId")
    let userId = searchParams.get("userId")
    let quan = searchParams.get("quan")
    let newOrder = {
        "book_quantity": parseInt(quan),
        "book_id_fk": parseInt(bookId),
        "user_id_fk": parseInt(userId),
    }
    const newOrders = await usersRepo.addOrder(newOrder)
    return Response.json(newOrders, { status: 200 });
}