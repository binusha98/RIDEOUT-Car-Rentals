const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors =  require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();


app.use(cors());
//app.use(bodyParser.json());

app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true 
}));


const URL = process.env.MONGODB_URL;

const PORT = process.env.PORT || 3000;
//const URL = 'mongodb+srv://MADHAVEE:Madhi99@thecentralperk.9weg6.mongodb.net/TheCentralPerk?retryWrites=true&w=majority'

mongoose.connect(URL,{
  //useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify: true
})

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("Mongodb connection is success!");

})

const VehicleRouter = require("./routes/vehicles.js");
app.use("/vehicle",VehicleRouter);

const supplierRouter = require("./routes/suppliers.js");
app.use("/supplier", supplierRouter);

const itemRouter = require("./routes/supplierItem");
app.use("/item", itemRouter);

const driverRouter = require("./routes/drivers");
app.use("/driver", driverRouter);

const bookingRouter = require("./routes/bookings");
app.use("/booking", bookingRouter);

const userRoutes = require("./routes/UserRoutes");
app.use('/user', userRoutes);

const paymentRouter = require("./routes/payments");
app.use('/payment', paymentRouter);

app.listen(PORT, ()=>{
    console.log(`Server is up and running on port number: ${PORT}`)
})
