require("dotenv").config();

var keys = require("./keys.js");

var fs = require("fs");
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// console.log(spotify);
// console.log(client);

var userType = process.argv;

var firstRequest = userType[2];
var secondRequest = userType[3];
var newArray = [];






var movie = function () {


    if (secondRequest) {

        let queryUrl = "http://www.omdbapi.com/?t=" + secondRequest + "&y=&plot=short&apikey=trilogy";
        request(queryUrl, function (error, response, body) {

            if (error) {
                console.log("here is a error");
            }


            if (!error && response.statusCode === 200) {
                console.log("======================================================================");

                console.log("Title of the movie: ", JSON.parse(body).Title); // * Title of the movie.
                console.log("Year the movie came out: ", JSON.parse(body).Year); // * Year the movie came out.
                console.log("IMDB Rating of the movie: ", JSON.parse(body).imdbRating); // * IMDB Rating of the movie.
                console.log(JSON.parse(body).Ratings[1].Source + " Rating of the movie is " + JSON.parse(body).Ratings[1].Value);
                // * Rotten Tomatoes Rating of the movie.
                console.log("Country where the movie was produced: ", JSON.parse(body).Country); // * Country where the movie was produced.
                console.log("Language of the movie: ", JSON.parse(body).Language); // * Language of the movie.
                console.log("Plot of the movie: ", JSON.parse(body).Plot); // * Plot of the movie.
                console.log("Actors in the movie: ", JSON.parse(body).Actors); // * Actors in the movie.
            };
        });

    } else {
        let hotMovie = "Mr. Nobody"
        let queryUrl = "http://www.omdbapi.com/?t=" + hotMovie + "&y=&plot=short&apikey=trilogy";

        request(queryUrl, function (error, response, body) {

            if (error) {
                console.log("here is a error");
            }
            if (!error && response.statusCode === 200) {
                console.log("======================================================================");
           
                console.log("Title of the movie: ", JSON.parse(body).Title); // * Title of the movie.
                console.log("Year the movie came out: ", JSON.parse(body).Year); // * Year the movie came out.
                console.log("IMDB Rating of the movie: ", JSON.parse(body).imdbRating); // * IMDB Rating of the movie.
                console.log(JSON.parse(body).Ratings[1].Source + " Rating of the movie is " + JSON.parse(body).Ratings[1].Value);
                // * Rotten Tomatoes Rating of the movie.
                console.log("Country where the movie was produced: ", JSON.parse(body).Country); // * Country where the movie was produced.
                console.log("Language of the movie: ", JSON.parse(body).Language); // * Language of the movie.
                console.log("Plot of the movie: ", JSON.parse(body).Plot); // * Plot of the movie.
                console.log("Actors in the movie: ", JSON.parse(body).Actors); // * Actors in the movie.
            };
        });
    };
};


var tweets = function () {
    var params = {
        status: "I am a Tweet",
        count: 20
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (let i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
            }
        } else {
            console.log("something wrong");
        }
    });
};




var spotifyPlay = function () {

    // If no song is provided then your program will default to "The Sign" by Ace of Base.

    if (secondRequest) {
        spotify.search({
            type: 'track',
            query: secondRequest,
            limit: 5
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            // console.log( data.tracks);



            for (let i = 0; i < data.tracks.items.length; i++) {

                console.log("======================================================================");
                console.log("the Artist is: ", data.tracks.items[i].artists[0].name);
                console.log("The song's name: ", data.tracks.items[i].name); //Die A Happy Man
                console.log("A preview link of the song from Spotify: ", data.tracks.items[i].external_urls.spotify);
                console.log("The album that the song is from: ", data.tracks.items[i].album.name); //Tangled Up
            }
        });

    } else {
        spotify.search({
            type: 'track',
            query: "The Sign",
            limit: 40
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            // console.log( data.tracks);
            for (let i = 0; i < data.tracks.items.length; i++) {

                if (data.tracks.items[i].name == "The Sign" && data.tracks.items[i].artists[0].name == "Ace of Base") {
                    console.log("the Artist is: ", data.tracks.items[i].artists[0].name);
                    console.log("The song's name: ", data.tracks.items[i].name);
                    console.log("A preview link of the song from Spotify: ", data.tracks.items[i].external_urls.spotify);
                    console.log("The album that the song is from: ", data.tracks.items[i].album.name);
                    console.log("======================================================================");
                } else {
                    // console.log("wrong");
                }

            }
        });


    }



};

var justDoIt = function () {

    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        // We will then re-display the content as an array for later use.
        console.log(dataArr);


        firstRequest = dataArr[0];
        secondRequest = dataArr[1];

        if(firstRequest === "spotify-this-song"){
            spotifyPlay();
        }
      });
};




switch (firstRequest) {

    case "movie-this":
        movie();
        break;

    case "my-tweets":
        tweets();
        break;

    case "spotify-this-song":
        spotifyPlay();
        break;

    case "do-what-it-says":
        justDoIt();
        break;

    default:
        console.log("enter wrong");

};


var lastchar;

function read(){
 
    fs.readFile("log.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
  
    // We will then print the contents of data
    console.log(data);
    // console.log(typeof(data));
    lastchar = data.charAt(data.length - 1);
    console.log(lastchar);
  });
};


if(firstRequest && secondRequest){
    read();
  if(lastchar == ","){

    fs.appendFile("log.txt", firstRequest+","+ secondRequest, function(err) {

        // If an error was experienced we say it.
        if (err) {
          console.log(err);
        }
      
        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        else {
          console.log("Content Added!");
        }
      
      });


  }else {
    fs.appendFile("log.txt", ","+ firstRequest+","+ secondRequest, function(err) {

        // If an error was experienced we say it.
        if (err) {
          console.log(err);
        }
      
        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        else {
          console.log("Content Added!");
        }
      
      });


  }
  
}else{

    read();
    if(lastchar == ","){
        fs.appendFile("log.txt", firstRequest+"," , function(err) {
    
            // If an error was experienced we say it.
            if (err) {
              console.log(err);
            }
          
            // If no error is experienced, we'll log the phrase "Content Added" to our node console.
            else {
              console.log("Content Added!");
            }
          
          });
    
    
      }else{
        fs.appendFile("log.txt", ","+firstRequest , function(err) {
    
            // If an error was experienced we say it.
            if (err) {
              console.log(err);
            }
          
            // If no error is experienced, we'll log the phrase "Content Added" to our node console.
            else {
              console.log("Content Added!");
            }
          
          });
      }
}

