require('dotenv').config();//import ENV
const mysql = require('mysql2');//import mysql
//test connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DBNAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD
    });
module.exports = connection;