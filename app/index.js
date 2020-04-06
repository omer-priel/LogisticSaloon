/**
 * The Main of the server.
 */

"use strict";

console.log("Open the server...");

// require server config
const config = require("./config");

if (process.env.port) {
    config.network.port = Number(process.env.port);
}

// require all outside packages
const express = require("express"),
    ejs = require("ejs"),
    fs = require("fs"),
    dateformat = require("dateformat"),
    bodyParser = require("body-parser");

// require system changes
require("./system");

console.log("Setup the Server...");

// setup the app
let app = express();

app.use(bodyParser.urlencoded({extended: true})); // load body from the requests

// routes
app.use("/", express.static("public"));

let routes = require("./routes");
app.use(routes); // add the routes functions

// open the server
app.listen(config.network.port, function() {
    console.log("Server Started...");
});