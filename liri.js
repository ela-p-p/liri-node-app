// add code to read and set any environment variables with the dotenv package:
require("dotenv").config();
const Twitter = require("Twitter")
const Spotify = require('node-spotify-api');
const keys = require("./keys");
const client = new Twitter(keys.twitter);
const spotifyQuery = new Spotify(keys.spotify);

const request = require("request");
const fs = require("fs");


if (process.argv[2] === "movie-this") {
    omdbApi();
}
else if (process.argv[2] === "my-tweets") {
    twitterNPM();
}
else if (process.argv[2] === "spotify-this-song") {
    spotifyNPM();
}
else if (process.argv[2] === "do-what-it-says") {
    readRandom();
}

//Twitter section
function twitterNPM() {
    var params = { screen_name: 'Elizabe35444694', count: 20 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            var tweetArray = tweets.map(function (tweet) {
                return tweet.text
            });
            console.log(tweetArray.join("\n"))
        }
    });
}
//OMDB section
function omdbApi() {

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
            movieName += nodeName[i];
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
function spotifyNPM() {
    var nodeMusic = process.argv;
    var songName = "";
    if (!nodeMusic[3]) {
        songName = "The Sign, Ace of Base"
    }
    for (var i = 3; i < nodeMusic.length; i++) {
        if (i > 3 && i < nodeMusic.length) {
            songName += "+" + nodeMusic[i];
        }
        else {
            songName += nodeMusic[i];
        }
    }
    spotifyQuery.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        else {
            var dataResult = data.tracks.items[0];

            console.log("Artist: " + dataResult.artists[0].name + "\nSong Name: " + dataResult.name + "\nSpotify Link: " + dataResult.preview_url + "\nAlbum: " + dataResult.album.name);
        };
    });

}
