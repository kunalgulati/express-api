// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const cors = require("cors");

/**
 * Required Routes
 */
const indexRouter  = require('./routes/index');
const apiRouter  = require('./routes/api');
// const dbRouter = require('./routes/db');
 
/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";
app.use(cors())

/**
 *  App Configuration
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

/**
 * Routes Definitions
 */
app.use('/', indexRouter);
app.use('/', apiRouter)
// app.use('/', dbRouter);
/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});