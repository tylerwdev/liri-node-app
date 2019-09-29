require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
;

var spotify = new Spotify(keys.spotify);

  function spotifyThis(userSongName){
     spotify
    .search({ type: 'track', query: userSongName })
    .then(function(response) {
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
    .catch(function(err) {
      console.log(err);
    }); 
  } 
  

    if (process.argv[2] === "spotify-this"){
        spotifyThis(process.argv[3]);
    }