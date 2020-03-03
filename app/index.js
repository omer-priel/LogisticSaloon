/**
 * The Main of the server.
 */

"use strict";

console.log("Open the server...");

// require server config
const config = require("app/config");

if (process.env.port) {
    config.network.port = Number(process.env.port);
}
if (process.env.db) {
    config.network.db = process.env.db;
}

// require all outside packages
const express = require("express"),
    ejs = require("ejs"),
    fs = require("fs"),
    dateformat = require("dateformat"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

// require system changes
require("./system");

const logger = require("./core/logger");

const models = require("./db/models"),
    seeds = require("./db/seeds");

console.log("Setup the Server...");

// setup the app
let app = express();

app.use(bodyParser.urlencoded({extended: true})); // load body from the requests

mongoose.connect(`mongodb://${config.network.db}/app_logistic_saloon`, { useNewUrlParser: true, useUnifiedTopology: true } );

mongoose.connection.on('error', () => {
    console.log("Database not connected!");
});

mongoose.connection.once('open', async () => {
    
});

// routes
app.use("/", express.static("public"));

let routes = require("./routes");
app.use(routes); // add the routes functions

// open the server
app.listen(config.network.port, function() {
    console.log("Server Started...");
});