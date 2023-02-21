const express=require('express');
const { getSellerVehiclesEndpoint, getSellerVehiclesBetweenDatesEndpoint } = require('../Controllers/barscontroller');

let barsRouter = express.Router();
barsRouter.get('/',getSellerVehiclesEndpoint);
barsRouter.post('/',getSellerVehiclesBetweenDatesEndpoint);

module.exports = {barsRouter}