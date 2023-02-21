process.env.MONGO_URL="mongodb://localhost:27017";
const { addUserEndpoint } = require("../../main/Controllers/UserController");
const Request = require("../Stubs/Request");
const Response = require("../Stubs/Response");

async function testAddUser(data)
{
    let request=new Request(data);
    let response=new Response();
    await addUserEndpoint(request,response);
    console.log(response.data);
}

testAddUser({"name":"Mhasa","email":"a@gmail.com","password":"422","role":"customer"})