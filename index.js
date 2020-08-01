// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");

/**
 * Required Routes
 */
var indexRouter  = require('./routes/index');
var pingRouter  = require('./routes/ping');


 
/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

/**
 * Routes Definitions
 */
app.use('/', indexRouter);
app.use('/', pingRouter)
/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});