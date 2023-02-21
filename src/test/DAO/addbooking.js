process.env.MONGO_URL="mongodb://localhost:27017";
const { addBooking } = require("../../main/mongo/dao/BookingDAO");



let details={vehicleid:'63dfd2cc7d6b4d50a5d7072c',date:'2023-12-7','customeremail':"saigovardhan@gmail.com"}
addBooking(details).then(data=>console.log(data));