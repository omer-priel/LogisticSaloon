/**
 * The routes system.
 */

// require packages
let express = require("express");

let logger = require("app/logger");

// Setup router
let router = express.Router({mergeParams: true});

// main middlewares

router.use((req, res, next) => {

    if (req.body.body) {
        req.body = JSON.parse(req.body.body);
    }

    next();
});

const mainRouter = require("./controllers");
router.use(mainRouter);

module.exports = router;