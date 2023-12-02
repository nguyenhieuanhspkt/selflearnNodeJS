const express = require("express");
const path = require("path");
const homeController = require('./controller/homeController');
const app = express();

app.get("/",homeController);
//https://www.youtube.com/watch?v=6BozpmSjk-Y