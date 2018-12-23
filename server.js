// Dependencies
// ===========================================================
var express = require("express");

var app = express();
var PORT = process.env.PORT || 8080;
var path = require("path");

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);
// Sets up the Express app to handle data parsing

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
