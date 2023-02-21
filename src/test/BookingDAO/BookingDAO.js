process.env.MONGO_URL="mongodb://localhost:27017";
const { getSellersBookingBetweenDates } = require("../../main/mongo/dao/BookingDAO");



getSellersBookingBetweenDates("raghunadhnarne1022@gmail.com","63e27fefa6e4dc13681865ba","","").then(data=>console.log(data));