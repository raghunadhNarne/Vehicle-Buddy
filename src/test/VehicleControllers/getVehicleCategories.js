process.env.MONGO_URL="mongodb://localhost:27017";

const { getVehicleCategoriesEndpoint } = require("../../main/Controllers/VehicleController");
const Request = require("../Stubs/Request");
const Response = require("../Stubs/Response");

async function testGetVehicleCategories()
{
    let request=new Request();
    let response=new Response();


    await getVehicleCategoriesEndpoint(request,response);
    console.log(response.data);
}

testGetVehicleCategories();