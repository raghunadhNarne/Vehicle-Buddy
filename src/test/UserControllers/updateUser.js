process.env.MONGO_URL="mongodb://localhost:27017";
const { updateUserEndpoint } = require("../../main/Controllers/UserController");
const Request = require("../Stubs/Request");
const Response = require("../Stubs/Response");

async function testUpdateUser(data)
{
    let request=new Request(data);
    let response=new Response();
    

    await updateUserEndpoint(request,response);
    console.log(response.data);
}

testUpdateUser({"name":"Mhasa","email":"gsovardhansai@gmail.com","password":"Astalavista","role":"customers"})