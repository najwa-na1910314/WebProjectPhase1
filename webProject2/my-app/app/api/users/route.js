import usersRepo from "@/app/repo/UsersRepo.js";

export async function GET(request){
    let {searchParams} = new URL(request.url)
    let filterType = [...searchParams.keys()][0];
    let value = searchParams.get(filterType);
    let response;
    if(filterType == "uid"){
         response = await usersRepo.getUserById(parseInt(value)) // get selected user by id
    } else {
         response = await usersRepo.getUsers() // get all users
    }
    return Response.json(response, { status: 200 })
    
    
}