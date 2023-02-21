process.env.MONGO_URL="mongodb://localhost:27017";
const { validateUserEndpoint } = require("../../main/Controllers/UserAuthController");
const Request = require("../Stubs/Request");
const Response = require("../Stubs/Response");

async function testUpdateUser(data)
{
    let request=new Request(data);
    let response=new Response();
    

    await validateUserEndpoint(request,response);
    console.log(response.data);
}

testUpdateUser({"name":"Mhasa","email":"a@gmail.com","password":"422","role":"customers"})