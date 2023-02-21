process.env.MONGO_URL="mongodb://localhost:27017";
const { ObjectId } = require("mongodb");
const { getVehicle } = require("../../main/mongo/dao/VehicleDAO");


getVehicle(new ObjectId("63dff7bf8e05f6ec2944de1e")).then(data=>console.log(data))