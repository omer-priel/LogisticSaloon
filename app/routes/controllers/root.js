/**
 * route the /
 * the root route
 */

// require packages
const express = require("express");

const events = require("../../core/events");

// Setup router
let router = express.Router({mergeParams: true});

// the index page
router.get("/", async (req, res) => {

    res.sendFile("/public/index.html");
});

router.post("/events", async (req, res) => {

    res.send(events.getAll());
});

// the page not found.
router.get("*", async (req, res) => {
    res.redirect();
});

// the request action not found.
router.all("*", async (req, res) => {
    res.status(400);
    res.send("");
});

module.exports = router;