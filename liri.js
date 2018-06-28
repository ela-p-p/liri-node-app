// add code to read and set any environment variables with the dotenv package:
require("dotenv").config();
var request = require("request");
const fs = require("fs");

// const keys = require("./keys");
// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);
if (process.argv[2]=== "movie-this") {
    omdbapi();
}

//OMDB section
function omdbapi() {
    
    var nodeName = process.argv;
    var movieName = "";
    if (!nodeName[3]) {
        console.log(nodeName[3])
        movieName = "Mr.Nobody"
    } 
    for (var i = 3; i < nodeName.length; i++) {
        if (i > 3 && i < nodeName.length) {
            movieName += "+" + nodeName[i];
        }
        else {
            movieName +=nodeName[i];
        }
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"
    console.log(queryUrl);
    request(queryUrl, function (error, response, body) {
        // If there were no errors and the response code was 200 (i.e. the request was successful)...
        if (!error && response.statusCode === 200) {

            // Print results
            console.log("Title: " + JSON.parse(body).Title + "\nRelease Year: " + JSON.parse(body).Year + "\nIMDb Rating: " + JSON.parse(body).imdbRating + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\nProduced in: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nStarring: " + JSON.parse(body).Actors);
        }
    });
}

