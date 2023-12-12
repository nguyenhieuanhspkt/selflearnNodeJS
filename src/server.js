
const express = require('express');//import Express
const app = express();//create app express
require('dotenv').config();//import ENV
const port = process.env.PORT||3000;//import port
const configviewEngine = require('./config/viewEngine')//import viewEnginemodule
const configRequest = require('./config/requestbody')//import requestBody

const webRouter = require('./routes/web');//import route


//config req.body
configRequest(app)
//template engine
configviewEngine(app)



//kai bao route
app.use('/',webRouter);



//
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});



//https://www.youtube.com/watch?v=bpNDRiFWqDc&list=PLncHg6Kn2JT734qFpgJeSfFR0mMOklC_3&index=42