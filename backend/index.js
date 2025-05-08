/**
 * This file acts as the controller in the backend
 * It serves information as required by the frontend through
 * API get requests to the specified route
 */

// import statements
const express = require("express");
const app = express();
const cors = require("cors");
const cookieSession = require("cookie-session");

const apiRouter = require("./routes/Api");
const landingRouter = require("./routes/Landing");
const searchDestinationsRouter = require("./routes/SearchDestinationRoute");
const hotelsRouter = require("./routes/HotelsRoute");
const roomDisplayRouter = require("./routes/RoomDisplayRoute");
const bookHotelRouter = require("./routes/BookHotelRoute");
// const userRouter = require('./routes/UserRoute');
const bookingsRouter = require("./routes/BookingRoute");
const bookingModel = require("./models/booking");
const db = require('./models/db');

// constants here 
const PORT = 3001

// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.use(cors());

app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from frontend

app.use(
    cookieSession({
      name: "ESC",
      keys: ["COOKIE_SECRET"], // should use as secret environment variable
      httpOnly: true,
    })
  );

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// sync DBs here 
bookingModel.sync()

// const db = require("./models");

db.sequelize.sync()

// define routes here
app.use("/", landingRouter);
app.use("/destinations", searchDestinationsRouter);
app.use("/api", searchDestinationsRouter); // ✅ add this!
app.use("/hotels", hotelsRouter);
app.use("/rooms", roomDisplayRouter);
app.use("/book_hotel", bookHotelRouter);

// DO FIRST !!!! the fked up user routes 
require("./routes/AuthRoutes")(app);
require("./routes/UserRoute")(app);
app.use("/bookings", bookingsRouter);

// Utility endpoints here
app.use("/api", apiRouter);

app.listen(PORT, () => {
    console.log("Server running on port 3001");
})


module.exports = { app };