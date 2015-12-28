function ArtistFromData(data){
  this.name = data.artists.items[0].name;
  this.id = data.artists.items[0].id;
  this.popularity = data.artists.items[0].popularity;
  this.topFive;
  this.trackPopularity = [];
  this.trackNames = [];
}
