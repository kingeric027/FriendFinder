// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends.js");
//var friends = require("./app/data/friends").default;
//var waitListData = require("../data/waitinglistData");
//console.log(friends);

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  //function to find the most similar friend
  findLike = function(addedFriend){
    var allDif = [];
    for(i = 0; i<friends.length; i++){
        var friendScore = friends[i].scores;
        var dif = 0;
        for(j = 0; j<friendScore.length; j++){
            dif = dif + Math.abs(friendScore[j] - addedFriend.scores[j]);
        }
        allDif.push(dif);
    }
    //now find index of smallest element, thats the friend you want
    var min = allDif[0];
    var index = 0;
    for(i=0; i<allDif.length; i++){
        if (allDif[i] < min){
            index = i;
            min = allDif[i];
        }
    }
    return friends[index];
}

    app.get("/api/friends", function(req, res) {
      res.json(friends);
    });

  //app.get("/api/waitlist", function(req, res) {
  //  res.json(waitListData);
  //});

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

    app.post("/api/friends", function(req, res) {
      var likeFriend = findLike(req.body);
      console.log(likeFriend);

      res.json(likeFriend);
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
      friends.push(req.body);
    });
};
