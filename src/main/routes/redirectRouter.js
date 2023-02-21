const express=require('express');
const { redirectIfNotSellerEndpoint, redirectIfNotCustomerEndpoint } = require('../Controllers/redirectContoller');
let redirectRouter=express.Router();

redirectRouter.get('/isSeller',redirectIfNotSellerEndpoint);
redirectRouter.get('/isCustomer',redirectIfNotCustomerEndpoint);
module.exports = {redirectRouter};