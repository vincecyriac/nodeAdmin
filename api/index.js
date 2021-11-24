//use dotenv to load environment variables
require('dotenv').config();

//create a new express server
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//import cors to allow cross origin resource sharing
const cors = require('cors');
app.use(cors());

//use the body-parser middleware to parse the request body
const bodyParser = require('body-parser');
app.use(bodyParser.json());


//configure routes
const userRouter  = require('./src/routes/user.router'); 
app.use('/api/user', userRouter);
const adminRouter  = require('./src/routes/admin.router');
app.use('/api/admin', adminRouter);




//listen for requests
app.listen(port, () => console.log(`Listening on port ${port}`));
