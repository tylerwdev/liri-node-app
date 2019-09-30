var format = require('date-fns');

require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

function spotifyThis(userSongName) {
    spotify
        .search({ type: 'track', query: userSongName })
        .then(function (response) {
            //   console.log(response);
            for (let i = 0; i < response.tracks.items.length; i++) {



                var artistName = response.tracks.items[i].artists[0].name;
                var songName = response.tracks.items[i].name;
                var previewUrl = response.tracks.items[i].preview_url;
                var albumName = response.tracks.items[i].album.name;
                console.log(artistName);
                console.log(songName);
                console.log(previewUrl);
                console.log(albumName);
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}


function movieThis(movie) {
    // Include the axios npm package (ran the axios npm package already)
    var axios = require("axios");

    // Then run a request with axios to the OMDB API with the movie specified
    axios.get("http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy").then(
        function (response) {

            var movieTitle = response.data.Title;
            var movieRelease = response.data.Released;
            var imdb = response.data.imdbRating;
            var movieRating = response.data.Ratings[1];
            var movieCountry = response.data.Country;
            var movieLanguage = response.data.Language;
            var moviePlot = response.data.Plot;
            var movieActors = response.data.Actors;

            console.log(movieTitle);
            console.log(movieRelease);
            console.log(imdb);
            console.log(movieRating);
            console.log(movieCountry);
            console.log(movieLanguage);
            console.log(moviePlot);
            console.log(movieActors);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}


function concertThis(artist) {

    var axios = require("axios");

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function (response) {

            // console.log(response.data)
            for (let i = 0; i < response.data.length; i++) {
               
                var concertDate = format.format(new Date(response.data[i].datetime), 'MM/dd/yyyy');
                var concertName = response.data[i].venue.name;
                var concertRegion = response.data[i].venue.region;

                console.log(concertDate);
                console.log(concertName);
                console.log(concertRegion);
                
            }

        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

}




if (process.argv[2] === "spotify-this") {
    spotifyThis(process.argv[3]);
}
else if (process.argv[2] === "movie-this") {
    movieThis(process.argv[3]);
}
else if (process.argv[2] === "concert-this") {
    concertThis(process.argv[3]);
}


