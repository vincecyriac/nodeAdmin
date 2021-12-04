//use dotenv to load environment variables
require("dotenv").config();

//create a new express server
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

//import cors to allow cross origin resource sharing
const cors = require("cors");
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }));

//use the body-parser middleware to parse the request body
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
  next();
});

//configure routes
const adminRouter = require("./src/routes/admin.router");
app.use("/api/admin", adminRouter);
const userRouter = require("./src/routes/user.router");
app.use("/api/user", userRouter);


//listen for requests
app.listen(port, () => console.log(`Listening on port ${port}`));
