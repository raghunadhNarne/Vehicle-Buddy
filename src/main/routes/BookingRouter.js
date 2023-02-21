const express=require('express');
const { addBookingEndpoint, getCustomerBookingsEndpoint, getSellersBookingEndpoint } = require('../Controllers/BookingController');
const { getSellersBooking } = require('../mongo/dao/BookingDAO');
let bookingRouter=express.Router();

bookingRouter.post('/bookvehicle',addBookingEndpoint);
bookingRouter.get('/getCustomerBookings',getCustomerBookingsEndpoint);
bookingRouter.get('/getSellerBookings',getSellersBookingEndpoint);

module.exports={bookingRouter};