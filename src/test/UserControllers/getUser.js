process.env.MONGO_URL="mongodb://localhost:27017";
const { getUserEndpoint } = require("../../main/Controllers/UserController");
const Request = require("../Stubs/Request");
const Response = require("../Stubs/Response");

async function testGetUser(data)
{
    let request=new Request(data);
    let response=new Response();
    request.setParams('email',data.email);

    await getUserEndpoint(request,response);
    console.log(response.data);
}

testGetUser({"name":"Mhasa","email":"govardhansai@gmail.com","password":"422","role":"customer"})