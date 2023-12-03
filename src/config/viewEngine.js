const express = require('express');
const path = require('path');

const configviewEngine = (app) => {
    //template engine
    app.set('views', path.join('./src','views'));
    app.set('view engine', 'ejs');
    //config static file:image/css/js
    app.use(express.static(path.join('./src', 'public')));
}
module.exports = configviewEngine;