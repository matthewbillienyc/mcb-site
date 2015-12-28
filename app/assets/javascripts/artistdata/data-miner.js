function DataMiner(artistName){
  this.fetchArtistUrl = 'https://api.spotify.com/v1/search?q='+artistName+'&type=artist';
  this.fetchTracksUrl;
  this.artistData;
}

DataMiner.prototype = {
  getArtistData: function(){
    var self = this;
    $.ajax({
      url: this.fetchArtistUrl,
      method: 'GET',
      dataType: 'JSON',
      async: false,
      success: function(data){
        self.artistData = data;
      }
    })
  },
  getTopTracks: function(artist){
    var artistObj = artist;
    var url = this.fetchTracksUrl;
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'JSON',
      async: false,
      success: function(data){
        artistObj.topFive = data.tracks.slice(0,5);
        artistObj.topFive.forEach(function(track){
          artistObj.trackNames.push(track.name)
        })
      }
    })
  },
  getTrackPopularity: function(artist){
    artist.topFive.forEach(function(track){
      artist.trackPopularity[artist.trackPopularity.length] = track.popularity;
    })
  }
}
