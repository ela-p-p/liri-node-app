// add code to read and set any environment variables with the dotenv package:
require("dotenv").config();
// As always, we grab the fs package to handle read/write
const fs = require("fs");

const keys = require("./keys");

// Here we incorporate the "request" npm package
var request = require("request");
// We then run the request module on a URL with a JSON
request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {
// If there were no errors and the response code was 200 (i.e. the request was successful)...
if (!error && response.statusCode === 200) {

// Then we print out the imdbRating
console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
}
});


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
