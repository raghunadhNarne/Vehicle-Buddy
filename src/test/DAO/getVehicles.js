const { getVehicles } = require("../../main/mongo/dao/VehicleDAO");

process.env.MONGO_URL="mongodb://localhost:27017";



getVehicles().then(data=>console.log(data));