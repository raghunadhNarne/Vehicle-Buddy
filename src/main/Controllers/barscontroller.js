const {getSellersBooking,getSellersBookingBetweenDates,} = require("../mongo/dao/BookingDAO");

async function getSellerVehiclesEndpoint(req, res) {
  let result = { data: [], success: false };

  try {
    if (res.locals.user == undefined) {
      result.data = [];
      result.success = false;
      result.redirect = true;
    } else {
      if (res.locals.user.role != "seller") {
        result.data = [];
        result.success = false;
        result.redirect = true;
      } else {
        let data = await getSellersBooking(res.locals.user.email);
        result.success = true;
        result.data = data;
      }
    }
  } catch (E) {
    console.log(E);
    result.success = false;
    result.data = [];
  }
  res.json(result);
}

async function getSellerVehiclesBetweenDatesEndpoint(req, res) {
  let result = { data: [], success: false };

  try {
    if (res.locals.user == undefined) {
      result.data = [];
      result.success = false;
      result.redirect = true;
    } else {
      if (res.locals.user.role != "seller") {
        result.data = [];
        result.success = false;
        result.redirect = true;
      } else {
        let data = await getSellersBookingBetweenDates(
          res.locals.user.email,
          req.body.vehicleid,
          req.body.fromdate,
          req.body.todate
        );
        result.success = true;
        result.data = data;
      }
    }
  } catch (E) {
    console.log(E);
    result.success = false;
    result.data = [];
  }
  res.json(result);
}

module.exports = {getSellerVehiclesEndpoint,getSellerVehiclesBetweenDatesEndpoint}
