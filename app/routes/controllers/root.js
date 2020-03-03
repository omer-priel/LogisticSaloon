/**
 * route the /
 * the root route
 */

// require packages
const express = require("express");

// Setup router
let router = express.Router({mergeParams: true});

// the index page
router.get("/", async (req, res) => {

    res.sendFile("/public/index.html");
});

// not the parg found.
router.get("*", async (req, res) => {
    res.redirect();
});

// the request action not found.
router.all("*", async (req, res) => {
    res.status(400);
    res.send("");
});

module.exports = router;