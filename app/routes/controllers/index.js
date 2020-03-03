/**
 * The main router.
 */

// require packages
let express = require("express");

//routers index
let routers = {
    root: "/",
};

// Setup router
let router = express.Router({mergeParams: true});

// require all the routers
Object.keys(routers).forEach(name => {
    let path = routers[name];
    let sub = require("./" + name);
    
    router.use(path, sub);
});

module.exports = router;