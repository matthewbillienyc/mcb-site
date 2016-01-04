
var $artists = [];
var $artistNames = [];

$(function(){

  $('#reset').click(function(){
    $('#graphbox')[0].innerHTML = ''
  })

  $('#graph').click(function(){
    var $inputs = $("input")

    $inputs.each(function(i){
      var dataMiner = new DataMiner(this.value);
      dataMiner.getArtistData();
      var artist = new ArtistFromData(dataMiner.artistData);
      dataMiner.fetchTracksUrl = 'https://api.spotify.com/v1/artists/'+artist.id+'/top-tracks?country=US'
      dataMiner.getTopTracks(artist);
      dataMiner.getTrackPopularity(artist);
      $artists[$artists.length] = artist;
    })
    $artists.forEach(function(artist){
      $artistNames.push(artist.name);
    })
    var d3Charter = new D3Charter();
    d3Charter.prepTrackChart();
    $artists.forEach(function(artist, index){
      d3Charter.chartTracks(artist, index)
    })
    d3Charter.prepArtistChart();
    d3Charter.chartArtists($artists);
  })

})
