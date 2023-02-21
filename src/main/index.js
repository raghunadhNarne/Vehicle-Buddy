require('dotenv').config({path:'environment.env'});
const { MongoClient } = require('mongodb');
globalThis.mongoClient=new MongoClient(process.env.MONGO_URL);
const express = require("express");
const cookieParser=require('cookie-parser');
const { redirectRouter } = require('./routes/redirectRouter');
const { userRouter } = require("./routes/UserRouter");
const { indexRouter } = require("./routes/indexPageRouter");
const { autoCompleteRouter } = require('./routes/AutoCompleteRouter');
const { injectUser } = require('./Controllers/middleware/InjectUser');
const { vehicleRouter } = require('./routes/VehicleRouter');
const { bookingRouter } = require('./routes/BookingRouter');
const { barsRouter } = require('./routes/BarsRouter');
const { upload } = require('./multer/addVehicle');

//Added mongoclient


let app=express();
app.use('/',upload);
app.set('case sensitive routing', false);
app.use(express.json({limit:"10mb"}));
app.use(cookieParser());
app.use(express.static('static'));
app.use(express.static('./src/images/addVehicle'));
app.use(injectUser);
app.use('/autocomplete',autoCompleteRouter);
app.use('/user',userRouter);
app.use('/index',indexRouter);
app.use('/vehicle',vehicleRouter);
app.use('/book',bookingRouter);
app.use('/bars',barsRouter);
app.use('/redirect',redirectRouter);

app.listen(4292);