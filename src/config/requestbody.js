const express = require('express');
const path = require('path');

const configRequest = (app) => {
    //config req.body
    app.use(express.json())//for json
    app.use(express.urlencoded({ extended: true}))//for form data
}
module.exports = configRequest;

