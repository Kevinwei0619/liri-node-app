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
var saveStr = "";
var saveArray = [];
var nextLine = "\n";
var line = "=====================================================================";



var movie = function () {
    if (secondRequest) {

        let queryUrl = "http://www.omdbapi.com/?t=" + secondRequest + "&y=&plot=short&apikey=trilogy";
        request(queryUrl, function (error, response, body) {

            if (error) {
                console.log("here is a error");
            }

            if (!error && response.statusCode === 200) {
                console.log("======================================================================");

                console.log("Title of the movie: ", JSON.parse(body).Title  // * Title of the movie.
                + "\nYear the movie came out: ", JSON.parse(body).Year // * Year the movie came out.
                + "\nIMDB Rating of the movie: ", JSON.parse(body).imdbRating // * IMDB Rating of the movie.
                + "\nRotten Tomatoes Rating of the movie is " + JSON.parse(body).Ratings[1].Value
                + "\nCountry where the movie was produced: ", JSON.parse(body).Country // * Country where the movie was produced.
                + "\nLanguage of the movie: ", JSON.parse(body).Language // * Language of the movie.
                + "\nPlot of the movie: ", JSON.parse(body).Plot // * Plot of the movie.
                + "\nActors in the movie: ", JSON.parse(body).Actors); // * Actors in the movie.


                saveStr = "Title of the movie: " + JSON.parse(body).Title  // * Title of the movie.
                + "\nYear the movie came out: " + JSON.parse(body).Year // * Year the movie came out.
                + "\nIMDB Rating of the movie: " + JSON.parse(body).imdbRating // * IMDB Rating of the movie.
                + "\nRotten Tomatoes Rating of the movie is " + JSON.parse(body).Ratings[1].Value
                + "\nCountry where the movie was produced: " + JSON.parse(body).Country // * Country where the movie was produced.
                + "\nLanguage of the movie: " + JSON.parse(body).Language // * Language of the movie.
                + "\nPlot of the movie: "+ JSON.parse(body).Plot // * Plot of the movie.
                + "\nActors in the movie: " +  JSON.parse(body).Actors;

                // console.log(saveStr);

                saveData();
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
                console.log("Title of the movie: ", JSON.parse(body).Title  // * Title of the movie.
                + "\nYear the movie came out: ", JSON.parse(body).Year // * Year the movie came out.
                + "\nIMDB Rating of the movie: ", JSON.parse(body).imdbRating // * IMDB Rating of the movie.
                + "\nRotten Tomatoes Rating of the movie is " + JSON.parse(body).Ratings[1].Value
                + "\nCountry where the movie was produced: ", JSON.parse(body).Country // * Country where the movie was produced.
                + "\nLanguage of the movie: ", JSON.parse(body).Language // * Language of the movie.
                + "\nPlot of the movie: ", JSON.parse(body).Plot // * Plot of the movie.
                + "\nActors in the movie: ", JSON.parse(body).Actors); // * Actors in the movie.

                saveStr = "Title of the movie: " + JSON.parse(body).Title  // * Title of the movie.
                + "\nYear the movie came out: " + JSON.parse(body).Year // * Year the movie came out.
                + "\nIMDB Rating of the movie: " + JSON.parse(body).imdbRating // * IMDB Rating of the movie.
                + "\nRotten Tomatoes Rating of the movie is " + JSON.parse(body).Ratings[1].Value
                + "\nCountry where the movie was produced: " + JSON.parse(body).Country // * Country where the movie was produced.
                + "\nLanguage of the movie: " + JSON.parse(body).Language // * Language of the movie.
                + "\nPlot of the movie: "+ JSON.parse(body).Plot // * Plot of the movie.
                + "\nActors in the movie: " +  JSON.parse(body).Actors;
                saveData();
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
                saveArray.push(tweets[i].text);
            }
        } else {
            console.log("something wrong");
        }

        // console.log(saveArray);
        // saveData();
        fs.appendFile("log.txt", saveArray + nextLine + line + nextLine, function(err) {

            // If an error was experienced we say it.
            if (err) {
              console.log(err);
            }
            // If no error is experienced, we'll log the phrase "Content Added" to our node console.
            else {
              console.log("Content Added!");
            }
          });
       
    });
};




var spotifyPlay = function (secondRequest){

    // If no song is provided then your program will default to "The Sign" by Ace of Base.

    if (secondRequest) {
        spotify.search({
            type: 'track',
            query: secondRequest,
            limit: 2
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            // console.log( data.tracks);



            for (let i = 0; i < data.tracks.items.length; i++) {
                console.log("======================================================================");
                console.log("the Artist is: ", data.tracks.items[i].artists[0].name
                 + "\nThe song's name: ", data.tracks.items[i].name
                 + "\nA preview link of the song from Spotify: ", data.tracks.items[i].external_urls.spotify
                 + "\nThe album that the song is from: ", data.tracks.items[i].album.name);

              saveStr = "the Artist is: "+ data.tracks.items[i].artists[0].name
              + "\nThe song's name: "+ data.tracks.items[i].name
              + "\nA preview link of the song from Spotify: "+ data.tracks.items[i].external_urls.spotify
              + "\nThe album that the song is from: "+ data.tracks.items[i].album.name;
              saveData();
                };
            // console.log(saveArray);
          
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
                    console.log("the Artist is: ", data.tracks.items[i].artists[0].name
                    + "\nThe song's name: ", data.tracks.items[i].name
                    + "\nA preview link of the song from Spotify: ", data.tracks.items[i].external_urls.spotify
                    + "\nThe album that the song is from: ", data.tracks.items[i].album.name);
                    console.log("======================================================================");
                    saveStr = "the Artist is: "+ data.tracks.items[i].artists[0].name
                    + "\nThe song's name: "+ data.tracks.items[i].name
                    + "\nA preview link of the song from Spotify: "+ data.tracks.items[i].external_urls.spotify
                    + "\nThe album that the song is from: "+ data.tracks.items[i].album.name;
                    saveData();
                } else {
                    //  console.log("wrong");
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
        // console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        // We will then re-display the content as an array for later use.
        console.log(dataArr);

        for(let k = 0 ; k < dataArr.length ; k++){
            if(dataArr[k] === "movie-this" || dataArr[k] === "my-tweets" || dataArr[k] === "spotify-this-song" || dataArr[k] === "do-what-it-says" ){
                if(dataArr[k+1] !== "movie-this" || dataArr[k+1] !== "my-tweets" || dataArr[k+1] !== "spotify-this-song" || dataArr[k+1] !== "do-what-it-says"){
                    switch(dataArr[k]){
                        case "movie-this":
                        movie(dataArr[k+1]);
                        break;
                
                    case "my-tweets":
                        tweets();
                        break;
                
                    case "spotify-this-song":
                        spotifyPlay(dataArr[k+1]);
                        break;
                
                    case "do-what-it-says":
                        console.log("you need to try another key word");
                        break;
                
                    default:
                        console.log("Enter wrong in second switch");
                    }
                }else{
                    switch(dataArr[k]){
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
                        console.log("you need to try another key word");
                        break;
                
                    default:
                        console.log("Enter wrong in second switch");
                    }
    


                }
            }

        }
        // var first = dataArr[0];
        // var second = dataArr[1];

        // switch(first){
        //     case "movie-this":
        //     movie(second);
        //     break;
    
        // case "my-tweets":
        //     tweets();
        //     break;
    
        // case "spotify-this-song":
        //     spotifyPlay(second);
        //     break;
    
        // case "do-what-it-says":
        //     console.log("you need to try another key word");
        //     break;
    
        // default:
        //     console.log("Enter wrong in second switch");
        // }
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
    console.log("Enter wrong in first switch");

};


var lastchar;

function read(){
 
    fs.readFile("log.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
  
    // We will then print the contents of data
    // console.log(data);
    // console.log(typeof(data));
    lastchar = data.charAt(data.length - 1);
    // console.log(lastchar);
  });
};



if(firstRequest && secondRequest){
    fs.appendFile("log.txt", firstRequest+","+ secondRequest + nextLine, function(err) {

        // If an error was experienced we say it.
        if (err) {
          console.log(err);
        }
      
        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        else {
          console.log("Content key word Added!");
        }
      
      });
  
}else{
    fs.appendFile("log.txt", firstRequest+ nextLine , function(err) {
    
        // If an error was experienced we say it.
        if (err) {
          console.log(err);
        }
      
        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        else {
          console.log("Content key word Added!");
        }
      
      });

};
  


var saveData = function(){
    
        fs.appendFile("log.txt", saveStr + nextLine + line + nextLine, function(err) {

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

