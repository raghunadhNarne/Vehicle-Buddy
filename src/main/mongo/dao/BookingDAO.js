const { Collection, ObjectId, MongoClient } = require("mongodb");
const { getVehicle } = require("./VehicleDAO");

async function addBooking(bookingDetails) {
  let client = globalThis.mongoClient;
  //Retrieve Vehicle Details
  try {
    let vehicleid = bookingDetails.vehicleid;

    let vehicle = await getVehicle(vehicleid);
    //Add vehicle details
    if (vehicle == null) return false;
    console.log("HERE1");

    //await client.connect();

    let { selleremail, vehicleprice } = vehicle;

    let collection = client.db("vehicle_buddy").collection("bookings");
    let bookingdate = new Date(bookingDetails.date);

    if (bookingdate.toString().indexOf("Invalid") == 0) return false;

    let result = await collection.insertOne({
      vehiclelocation: vehicle.location,
      vehiclename: vehicle.fullmodel,
      vehicleid: vehicleid,
      selleremail: selleremail,
      vehicleprice: vehicleprice,
      customeremail: bookingDetails.customeremail,
      bookingdate: bookingdate,
    });
    if (result.insertedId != undefined) {
      return true;
    } else return false;
  } catch (E) {
    console.log(E);
    return false;
  } finally {
    //  await client.close();
  }
}

async function getCustomersBooking(email) {
  let client = globalThis.mongoClient;
  //Retrieve Vehicle Details
  try {
    //await client.connect();
    let collection = client.db("vehicle_buddy").collection("bookings");
    let bookings = [];
    if (email == undefined) return [];
    let cursor = collection.find(
      { customeremail: email },
      { projection: { _id: 0 } }
    );

    while (await cursor.hasNext()) {
      let curElement = await cursor.next();
      bookings.push(curElement);
    }
    return bookings;
  } catch (E) {
    console.log(E);
    return [];
  } finally {
    // await client.close();
  }
}

async function getSellersBooking(email) {
  let client = globalThis.mongoClient;
  //Retrieve Vehicle Details
  try {
    //await client.connect();
    let collection = client.db("vehicle_buddy").collection("bookings");
    let bookings = [];
    if (email == undefined) return [];
    let cursor = collection.find(
      { selleremail: email },
      { projection: { _id: 0 } }
    );

    while (await cursor.hasNext()) {
      let curElement = await cursor.next();
      bookings.push(curElement);
    }
    return bookings;
  } catch (E) {
    console.log(E);
    return [];
  } finally {
    //await client.close();
  }
}

async function getSellersBookingBetweenDates(
  email,
  vehicleId,
  fromDate,
  toDate
) {
  let client = globalThis.mongoClient;
  //Retrieve Vehicle Details
  try {
    //await client.connect();
    let collection = client.db("vehicle_buddy").collection("bookings");
    let bookings = [];
    let needdate = true;
    if (email == undefined) return [];

    let querydate = {};
    if (
      (fromDate == undefined || fromDate == null || fromDate == "") &&
      (toDate == undefined || toDate == null || toDate == "")
    ) {
      console.log("no from and to dates");
      querydate = {};
      needdate = false;
    } else if (fromDate == null || fromDate == undefined || fromDate == "") {
      console.log("no from date");
      querydate = {
        $lte: new Date(`${toDate}`),
      };
    } else if (toDate == null || toDate == undefined || toDate == "") {
      console.log("no to date");
      querydate = {
        $gte: new Date(`${fromDate}`),
      };
    } else {
      console.log("data between dates");
      querydate = {
        $gte: new Date(`${fromDate}`),
        $lte: new Date(`${toDate}`),
      };
    }

    let cursor = "";

    if (needdate) {
      cursor = collection.find({
        selleremail: email,
        vehicleid: vehicleId,
        bookingdate: querydate,
      });
    } else {
      cursor = collection.find({
        selleremail: email,
        vehicleid: vehicleId,
      });
    }
    if (await cursor.hasNext()) {
      console.log("retrived some data from database");
    } else {
      console.log("no data from database");
    }

    while (await cursor.hasNext()) {
      let curElement = await cursor.next();
      bookings.push(curElement);
    }
    return bookings;
  } catch (E) {
    console.log("error from bookingsdao.js", E);
    return [];
  } finally {
    //await client.close();
  }
}
module.exports = {
  addBooking,
  getCustomersBooking,
  getSellersBooking,
  getSellersBookingBetweenDates,
};
