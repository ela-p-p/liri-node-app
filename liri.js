// add code to read and set any environment variables with the dotenv package:
require("dotenv").config();
const Twitter = require("Twitter")
const Spotify = require('node-spotify-api');
const keys = require("./keys");
const client = new Twitter(keys.twitter);
const spotifyQuery = new Spotify(keys.spotify);

const request = require("request");
const fs = require("fs");
var choice = process.argv[2]
var nodeInput = process.argv;
var input = "";


//trying to make things DRY by not repeating the process.argv ++
function inputProcess(input) {
    for (var i = 3; i < nodeInput.length; i++) {
        if (i > 3 && i < nodeInput.length) {
            input += "+" + nodeInput[i];
        }
        else {
            input += nodeInput[i];
        }
    }
    return input
}

function choose(choice, fileInput) {
    if (choice === "movie-this") {
        omdbApi(fileInput);
    }
    else if (choice === "my-tweets") {
        twitterNPM();
    }
    else if (choice === "spotify-this-song") {
        spotifyNPM(fileInput);
    }
    else if (choice === "do-what-it-says") {
        readRandom();
    }
    else if (spotifyNPM(fileInput) || omdbApi(fileInput)){
        addLog();
    }
}
choose(choice)


//Twitter section
function twitterNPM() {
    var params = { screen_name: 'Elizabe35444694' };
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
function omdbApi(fileInput) {
    if (fileInput) {
        input = fileInput
    } else if (!nodeInput[3]) {
        input = "Mr.Nobody"
    }
    input = inputProcess(input)

    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy"
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var results = "\n-------------------\nTitle: " + JSON.parse(body).Title + "\nRelease Year: " + JSON.parse(body).Year + "\nIMDb Rating: " + JSON.parse(body).imdbRating + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\nProduced in: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nStarring: " + JSON.parse(body).Actors;;

            console.log(results);
            addLog(results);
        } else {
            console.log("Error" + error);
        }
    });
}

//spotify section
function spotifyNPM(fileInput) {
    if(fileInput) {
        input = fileInput 
    }
    else if (!nodeInput[3]) {
        input = "The Sign, Ace of Base"
    }
    input = inputProcess(input)

    spotifyQuery.search({ type: 'track', query: input }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        else {
            var dataResult = data.tracks.items[0];
            var results = "\n--------------\nArtist: " + dataResult.artists[0].name + "\nSong Name: " + dataResult.name + "\nSpotify Link: " + dataResult.preview_url + "\nAlbum: " + dataResult.album.name
            console.log(results)
            addLog(results)
            
        };
    });
}


//read from file random.txt
function readRandom() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error)
        } else {
            var dataArr = data.split(",");
            //first element
            var dataString = dataArr.shift();
            //second element
            var dataNode = dataArr.pop();          
            //run choose function
            choose(dataString, dataNode)
        };
    }); 
};

//output terminal window to log.txt
function addLog(text) {

    fs.appendFile("log.txt", text, function (err) {
        if (err) {
            console.log(err);
        }

    }); return text
}





