const { response } = require('express');
const mysqlDB = require('mysql');
require('dotenv').config();
const conn = mysqlDB.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});


conn.connect(function (err) {
    if (err) {
        console.log('Connection failed');
    }
    else {
        console.log('Connection successful');
    }
});

module.exports = conn;