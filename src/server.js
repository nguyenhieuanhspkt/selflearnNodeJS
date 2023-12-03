
const express = require('express');//import Express
const app = express();//create app express
require('dotenv').config();//import ENV
const port = process.env.PORT||3000;//import port
const configviewEngine = require('./config/viewEngine')//import viewEngine
const webRouter = require('./routes/web');


//template engine
configviewEngine(app)



//kai bao route
app.use('/v1',webRouter);
//
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

//https://www.youtube.com/watch?v=74U9rKT8f8w&list=PLncHg6Kn2JT734qFpgJeSfFR0mMOklC_3&index=21