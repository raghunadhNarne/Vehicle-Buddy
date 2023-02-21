const express=require('express');
const { addVehicleEndpoint, getVehiclesEndpoint, getSellerVehicleEndpoint, getVehicleEndpoint, updateVehicleEndpoint } = require('../Controllers/VehicleController');

let vehicleRouter=express.Router();


vehicleRouter.post('/addVehicle',addVehicleEndpoint);
vehicleRouter.get('/allVehicles',getVehiclesEndpoint);
vehicleRouter.get('/seller/getVehicles',getSellerVehicleEndpoint);
vehicleRouter.get('/getVehicle',getVehicleEndpoint);
vehicleRouter.put('/updateVehicle',updateVehicleEndpoint)
module.exports={vehicleRouter}